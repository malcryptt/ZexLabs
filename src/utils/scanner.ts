export type DnsRecord = {
    name: string;
    type: number;
    TTL: number;
    data: string;
};

export type DnsResponse = {
    Status: number;
    Answer?: DnsRecord[];
};

export type SslInfo = {
    valid: boolean;
    issuer: string | null;
    expiresAt: string | null;
    daysRemaining: number | null;
    error?: string;
};

export type HttpHeaders = {
    hsts: boolean;
    csp: boolean;
    xFrameOptions: boolean;
    xContentTypeOptions: boolean;
    referrerPolicy: boolean;
    rawHeaders: Record<string, string>;
};

export type ScanResult = {
    domain: string;
    ips: string[];
    mxRecords: string[];
    spf: string | null;
    dmarc: string | null;
    hasSpf: boolean;
    hasDmarc: boolean;
    ssl: SslInfo;
    httpHeaders: HttpHeaders;
};

const fetchRecords = async (name: string, type: string): Promise<DnsRecord[]> => {
    try {
        const res = await fetch(`https://dns.google/resolve?name=${name}&type=${type}`);
        const data: DnsResponse = await res.json();
        return data.Answer || [];
    } catch (e) {
        console.error(`Failed to fetch ${type} records for ${name}:`, e);
        return [];
    }
};

const checkSsl = async (domain: string): Promise<SslInfo> => {
    try {
        // Use crt.sh API to get SSL info (public, CORS-friendly)
        const res = await fetch(`https://crt.sh/?q=${domain}&output=json`, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error("crt.sh unavailable");
        const certs = await res.json();

        if (!certs || certs.length === 0) {
            return { valid: false, issuer: null, expiresAt: null, daysRemaining: null, error: "No certificates found" };
        }

        // Find most recent cert
        const latest = certs.reduce((a: { not_after: string }, b: { not_after: string }) =>
            new Date(a.not_after) > new Date(b.not_after) ? a : b
        );

        const expiresAt = latest.not_after;
        const daysRemaining = Math.floor(
            (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );

        return {
            valid: daysRemaining > 0,
            issuer: latest.issuer_name || null,
            expiresAt,
            daysRemaining,
        };
    } catch (e) {
        return {
            valid: false,
            issuer: null,
            expiresAt: null,
            daysRemaining: null,
            error: e instanceof Error ? e.message : "SSL check failed",
        };
    }
};

const checkHttpHeaders = async (domain: string): Promise<HttpHeaders> => {
    const emptyHeaders: HttpHeaders = {
        hsts: false, csp: false, xFrameOptions: false,
        xContentTypeOptions: false, referrerPolicy: false, rawHeaders: {}
    };

    try {
        // Use a CORS-friendly header-check proxy
        const res = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(`https://${domain}`)}`,
            { signal: AbortSignal.timeout(10000) }
        );

        if (!res.ok) return emptyHeaders;

        const data = await res.json();
        // allorigins returns headers in the response's headers field
        const headers: Record<string, string> = {};

        // Parse headers from the allorigins response
        const rawHeaders = data?.headers || {};
        for (const [k, v] of Object.entries(rawHeaders)) {
            headers[k.toLowerCase()] = String(v);
        }

        return {
            hsts: "strict-transport-security" in headers,
            csp: "content-security-policy" in headers,
            xFrameOptions: "x-frame-options" in headers,
            xContentTypeOptions: "x-content-type-options" in headers,
            referrerPolicy: "referrer-policy" in headers,
            rawHeaders: headers,
        };
    } catch {
        return emptyHeaders;
    }
};

export const scanDomain = async (domain: string): Promise<ScanResult> => {
    const [aRecords, mxRecords, txtRecords, dmarcRecords, ssl, httpHeaders] = await Promise.all([
        fetchRecords(domain, "A"),
        fetchRecords(domain, "MX"),
        fetchRecords(domain, "TXT"),
        fetchRecords(`_dmarc.${domain}`, "TXT"),
        checkSsl(domain),
        checkHttpHeaders(domain),
    ]);

    const ips = aRecords.map((r) => r.data);
    const mxs = mxRecords.map((r) => r.data);

    const txtData = txtRecords.map((r) => r.data.replace(/"/g, ""));
    const spf = txtData.find((t) => t.toLowerCase().includes("v=spf1")) || null;

    const dmarcData = dmarcRecords.map((r) => r.data.replace(/"/g, ""));
    const dmarc = dmarcData.find((t) => t.toLowerCase().includes("v=dmarc1")) || null;

    return {
        domain,
        ips,
        mxRecords: mxs,
        spf,
        dmarc,
        hasSpf: !!spf,
        hasDmarc: !!dmarc,
        ssl,
        httpHeaders,
    };
};
