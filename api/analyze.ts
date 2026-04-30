import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { domain, companyName, scanData } = req.body;

    // Connect to Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    const apiKey = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;

    if (!supabaseUrl || !supabaseKey || !apiKey) {
        return res.status(500).json({ error: "Server configuration missing keys" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Rate limiting logic
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';

    // Check amount of scans today for this IP
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: scans, error: scanError } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('ip_address', ip)
        .gte('created_at', today.toISOString());

    if (scans && scans.length >= 5) {
        return res.status(429).json({ error: "Rate limit exceeded. Maximum 5 free scans per day." });
    }

    // Insert new rate limit record
    await supabase.from('rate_limits').insert([
        { ip_address: ip, endpoint: 'analyze' }
    ]);

    // Construct Groq prompt
    const prompt = `Analyze this attack surface data for ${companyName} (${domain}). 
      IPs exposed: ${scanData.ips.join(", ")}. 
      MX Records: ${scanData.mxRecords.join(", ")}. 
      SPF Record: ${scanData.spf || "MISSING"}. 
      DMARC Record: ${scanData.dmarc || "MISSING"}. 
      Write a short, highly professional, slightly aggressive threat intelligence brief (2 paragraphs max) as ZexLabs. If they are missing SPF or DMARC, emphasize they are highly vulnerable to email spoofing and phishing attacks.`;

    try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!groqRes.ok) {
            const errorData = await groqRes.json();
            throw new Error(errorData.error?.message || "Failed to parse Groq AI");
        }

        const aiData = await groqRes.json();
        return res.status(200).json({ report: aiData.choices[0].message.content });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Failed to generate report" });
    }
}
