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

export type ScanResult = {
    domain: string;
    ips: string[];
    mxRecords: string[];
    spf: string | null;
    dmarc: string | null;
    hasSpf: boolean;
    hasDmarc: boolean;
};

export const scanDomain = async (domain: string): Promise<ScanResult> => {
    const fetchRecords = async (type: string) => {
        try {
            const res = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
            const data: DnsResponse = await res.json();
            return data.Answer || [];
        } catch (e) {
            console.error(`Failed to fetch ${type} records:`, e);
            return [];
        }
    };

    const aRecords = await fetchRecords("A");
    const mxRecords = await fetchRecords("MX");
    const txtRecords = await fetchRecords("TXT");

    const ips = aRecords.map((r) => r.data);
    const mxs = mxRecords.map((r) => r.data);

    const txtData = txtRecords.map((r) => r.data.replace(/"/g, ""));
    const spf = txtData.find((t) => t.toLowerCase().includes("v=spf1")) || null;
    const _dmarcRecords = await fetchRecords("TXT").then(r => r.length ? r : null).catch(() => null);

    // Actually, DMARC is at _dmarc.domain.com
    let dmarc = null;
    try {
        const dmarcRes = await fetch(`https://dns.google/resolve?name=_dmarc.${domain}&type=TXT`);
        const dmarcData: DnsResponse = await dmarcRes.json();
        if (dmarcData.Answer) {
            dmarc = dmarcData.Answer.map(r => r.data.replace(/"/g, "")).find(t => t.toLowerCase().includes("v=dmarc1")) || null;
        }
    } catch (e) {
        console.warn("DMARC lookup failed", e);
    }

    return {
        domain,
        ips,
        mxRecords: mxs,
        spf,
        dmarc,
        hasSpf: !!spf,
        hasDmarc: !!dmarc
    };
};
