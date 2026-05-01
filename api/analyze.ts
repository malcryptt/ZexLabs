// Simple in-memory rate limit map: ip -> { count, timestamp }
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { domain, companyName, scanData } = req.body;
    const apiKey = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "Server configuration missing keys" });
    }

    // Rate limiting logic
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';

    // Clean up old entries
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
        if (now - value.timestamp > WINDOW_MS) {
            rateLimitMap.delete(key);
        }
    }

    const record = rateLimitMap.get(ip);
    if (record) {
        if (record.count >= MAX_REQUESTS) {
            return res.status(429).json({ error: "Rate limit exceeded. Maximum 5 free scans per day." });
        }
        record.count += 1;
    } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

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
        const errMsg = e instanceof Error ? e.message : String(e);
        console.error("Groq error:", errMsg);
        return res.status(500).json({ error: `Failed to generate report: ${errMsg}` });
    }
}
