import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scanDomain, ScanResult } from "@/utils/scanner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Loader2, ShieldAlert, CheckCircle, Download, Activity, Globe, Mail, Server } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AttackSurface() {
    const [domain, setDomain] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [result, setResult] = useState<ScanResult | null>(null);
    const [aiReport, setAiReport] = useState("");
    const [progress, setProgress] = useState(0);

    const reportRef = useRef<HTMLDivElement>(null);

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!domain || !companyName) {
            toast.error("Please enter a domain and company name.");
            return;
        }

        setIsScanning(true);
        setResult(null);
        setAiReport("");
        setProgress(0);

        try {
            setLoadingText("Querying DNS records...");
            setProgress(25);
            const scanData = await scanDomain(domain);
            setResult(scanData);

            setLoadingText("Connecting to ZexLabs Security AI (Ollama)...");
            setProgress(50);

            const prompt = `Analyze this attack surface data for ${companyName} (${domain}). 
      IPs exposed: ${scanData.ips.join(", ")}. 
      MX Records: ${scanData.mxRecords.join(", ")}. 
      SPF Record: ${scanData.spf || "MISSING"}. 
      DMARC Record: ${scanData.dmarc || "MISSING"}. 
      Write a short, highly professional, slightly aggressive threat intelligence brief (2 paragraphs max) as ZexLabs. If they are missing SPF or DMARC, emphasize they are highly vulnerable to email spoofing and phishing attacks.`;

            // Use Groq API instead of Ollama
            const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

            if (!groqApiKey) {
                throw new Error("Missing VITE_GROQ_API_KEY. Please add it to your .env file.");
            }

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${groqApiKey}`
                },
                body: JSON.stringify({
                    model: "llama3-8b-8192", // Lightning fast 8B model on Groq
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Failed to connect to Groq AI");
            }

            setLoadingText("AI analyzing infrastructure vulnerabilities...");
            setProgress(85);

            const aiData = await response.json();
            setAiReport(aiData.choices[0].message.content || "");
            setProgress(100);

            toast.success("Scan and analysis complete.");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Scan failed. Please try again.");
        } finally {
            setIsScanning(false);
            setLoadingText("");
            setProgress(0);
        }
    };

    const handleDownloadPdf = async () => {
        if (!reportRef.current) return;
        toast.info("Generating PDF...");

        // Temporarily remove max-height and overflow restrictions from the ref container to capture everything
        const originalHeight = reportRef.current.style.height;
        reportRef.current.style.height = "auto";
        reportRef.current.style.overflow = "visible";

        try {
            const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: "#000000" });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${companyName.replace(/\\s+/g, "_")}_Attack_Surface_Report.pdf`);
            toast.success("PDF Downloaded successfully!");
        } catch (e) {
            console.error(e);
            toast.error("Failed to generate PDF");
        } finally {
            if (reportRef.current) {
                reportRef.current.style.height = originalHeight;
                reportRef.current.style.overflow = "";
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 py-24 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold tracking-tight text-slate-900 uppercase">
                        Attack Surface <span className="text-red-600">Monitor</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Real-time infrastructure intelligence. Discover your vulnerabilities before attackers do. 100% private in-browser analysis via WebLLM.
                    </p>
                </div>

                <form onSubmit={handleScan} className="bg-white border border-slate-200 p-8 rounded-xl shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Company Name</label>
                            <Input
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Ex: Acme Corp"
                                className="bg-white border-red-200 focus-visible:ring-red-600 focus-visible:ring-offset-0 text-slate-900 placeholder:text-slate-400 h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Target Domain</label>
                            <Input
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder="Ex: example.com"
                                className="bg-white border-red-200 focus-visible:ring-red-600 focus-visible:ring-offset-0 text-slate-900 placeholder:text-slate-400 h-12"
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={isScanning}
                        className="w-full mt-8 h-12 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide uppercase transition-all duration-300 shadow-[0_4px_14px_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:-translate-y-0.5"
                    >
                        {isScanning ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="animate-spin h-5 w-5" />
                                INITIATING SCAN...
                            </span>
                        ) : "RUN INTELLIGENCE GATHERING"}
                    </Button>
                </form>

                <AnimatePresence>
                    {isScanning && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-white border border-red-100 shadow-sm p-8 rounded-xl text-center space-y-6"
                        >
                            <Activity className="h-12 w-12 text-red-500 animate-pulse mx-auto" />
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-slate-800 terminal-font">{loadingText}</h3>
                                {progress > 0 && <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                </div>}
                            </div>
                        </motion.div>
                    )}

                    {result && aiReport && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* This is the container that gets converted to PDF */}
                            <div ref={reportRef} className="bg-white border border-red-200 shadow-lg p-8 md:p-12 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <ShieldAlert className="h-64 w-64 text-red-600 transform rotate-12" />
                                </div>

                                <div className="relative z-10 space-y-8">
                                    <div className="border-b border-red-200 pb-6 flex justify-between items-end">
                                        <div>
                                            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-wider">{companyName}</h2>
                                            <p className="text-red-500 font-mono mt-1">{result.domain}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-4xl font-bold text-red-600 uppercase tracking-widest">ZEXLABS</p>
                                            <p className="text-xs text-slate-500 uppercase">Automated Threat Intel</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                                <Globe className="h-5 w-5 text-red-500" />
                                                Network Infrastructure
                                            </h3>
                                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                                                <p className="text-sm text-slate-500 uppercase">Exposed IP Addresses</p>
                                                {result.ips.map(ip => (
                                                    <p key={ip} className="font-mono text-slate-800 text-sm">{ip}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                                <Mail className="h-5 w-5 text-red-500" />
                                                Email Security Posture
                                            </h3>
                                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                                                <div>
                                                    <p className="text-sm text-slate-500 uppercase flex items-center gap-2">
                                                        SPF Record
                                                        {result.hasSpf ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <ShieldAlert className="h-4 w-4 text-red-500" />}
                                                    </p>
                                                    <p className="font-mono text-slate-700 text-xs mt-1 break-all bg-white border border-slate-200 p-2 rounded shadow-sm">{result.spf || "Not Found - VULNERABLE"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-slate-500 uppercase flex items-center gap-2">
                                                        DMARC Record
                                                        {result.hasDmarc ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <ShieldAlert className="h-4 w-4 text-red-500" />}
                                                    </p>
                                                    <p className="font-mono text-slate-700 text-xs mt-1 break-all bg-white border border-slate-200 p-2 rounded shadow-sm">{result.dmarc || "Not Found - VULNERABLE"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-red-200">
                                        <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                            <Server className="h-5 w-5 text-red-500" />
                                            AI Threat Analysis
                                        </h3>
                                        <div className="bg-red-50 border border-red-100 shadow-inner p-6 rounded-lg text-slate-800">
                                            {aiReport.split('\n').map((paragraph, idx) => (
                                                <p key={idx} className="mb-4 last:mb-0 leading-relaxed font-body">{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-12 text-center text-xs text-slate-500 border-t border-slate-200 pt-6">
                                        WARNING: This report is generated automatically by ZexLabs Security AI. Results are derived from public DNS intelligence.
                                        <br />Schedule a manual penetration test for a comprehensive vulnerability analysis.
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    onClick={handleDownloadPdf}
                                    className="bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 px-8 uppercase tracking-widest font-bold shadow-sm transition-all"
                                >
                                    <Download className="mr-2 h-4 w-4" /> Download PDF Report
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
