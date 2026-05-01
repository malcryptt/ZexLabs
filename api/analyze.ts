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

    // Build a structured threat profile for the AI
    const ssl = scanData.ssl || {};
    const headers = scanData.httpHeaders || {};

    const missingControls: string[] = [];
    if (!scanData.hasSpf) missingControls.push("SPF (email spoofing protection)");
    if (!scanData.hasDmarc) missingControls.push("DMARC (email authentication enforcement)");
    if (!headers.hsts) missingControls.push("HTTP Strict Transport Security (HSTS)");
    if (!headers.csp) missingControls.push("Content Security Policy (CSP)");
    if (!headers.xFrameOptions) missingControls.push("X-Frame-Options (clickjacking protection)");
    if (!headers.xContentTypeOptions) missingControls.push("X-Content-Type-Options (MIME sniffing)");
    if (!headers.referrerPolicy) missingControls.push("Referrer-Policy");

    const sslStatus = ssl.error
        ? `UNKNOWN (check failed: ${ssl.error})`
        : ssl.valid
            ? `VALID — expires ${ssl.expiresAt || "unknown"} (${ssl.daysRemaining} days remaining)`
            : `EXPIRED or MISSING`;

    const sslRisk = ssl.daysRemaining !== null && ssl.daysRemaining < 30
        ? `CERTIFICATE EXPIRY IMMINENT (${ssl.daysRemaining} days) — HIGH RISK`
        : "";

    const prompt = `You are a senior offensive security analyst writing a threat intelligence brief for ZexLabs.

TARGET: ${companyName} (${domain})

DNS INTELLIGENCE:
- Exposed IP Addresses: ${scanData.ips.length > 0 ? scanData.ips.join(", ") : "None found"}
- MX (Mail) Servers: ${scanData.mxRecords.length > 0 ? scanData.mxRecords.join(", ") : "None found"}
- SPF Record: ${scanData.spf || "MISSING — domain is open to email spoofing"}
- DMARC Record: ${scanData.dmarc || "MISSING — no email authentication enforcement"}

SSL / TLS CERTIFICATE:
- Status: ${sslStatus}
- Issuer: ${ssl.issuer || "Unknown"}
${sslRisk ? `- WARNING: ${sslRisk}` : ""}

HTTP SECURITY HEADERS (checked via live request):
- HSTS: ${headers.hsts ? "PRESENT ✓" : "MISSING ✗"}
- Content-Security-Policy: ${headers.csp ? "PRESENT ✓" : "MISSING ✗"}
- X-Frame-Options: ${headers.xFrameOptions ? "PRESENT ✓" : "MISSING ✗"}
- X-Content-Type-Options: ${headers.xContentTypeOptions ? "PRESENT ✓" : "MISSING ✗"}
- Referrer-Policy: ${headers.referrerPolicy ? "PRESENT ✓" : "MISSING ✗"}

MISSING SECURITY CONTROLS (${missingControls.length} identified):
${missingControls.length > 0 ? missingControls.map(c => `- ${c}`).join("\n") : "None — strong security posture"}

Write a 3-paragraph professional threat intelligence brief:
1. Executive summary: overall risk posture based on the findings above. Be specific and data-driven, reference the actual IP, MX, SSL, and header findings.
2. Critical vulnerabilities: spell out exactly which missing controls create which attack vectors (e.g., missing SPF = phishing/spoofing risk, missing HSTS = SSL stripping, missing CSP = XSS). Be direct and technical.
3. Remediation priorities: rank the top 3 actions the organization must take immediately, in order of risk severity.

Tone: authoritative, concise, professional. No marketing language. Write as ZexLabs Security Intelligence.`;

    try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.4,
                max_tokens: 800
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
