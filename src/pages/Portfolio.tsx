import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Code2, Shield, Cpu, Layout, AppWindow } from 'lucide-react';

const categories = [
  "all",
  "security tools",
  "web platforms",
  "applications",
  "ai systems",
  "frontend lab"
];

const projects = [
  // SECURITY TOOLS
  {
    title: "Vektor",
    category: "security tools",
    subCategory: "AI · Security · Web3",
    stack: ["Python", "Next.js", "Solana", "OpenRouter"],
    description: "An AI-powered Solana smart contract security auditor that simulates adversarial reasoning to detect vulnerabilities before deployment. Vektor analyses on-chain programs using large language models trained to reason like an attacker — catching logic flaws, access control issues, and economic exploits that static analysers miss. Built for the Colosseum Frontier 2026 hackathon.",
    url: "https://vektor-virid.vercel.app/",
  },
  {
    title: "Taproot",
    category: "security tools",
    subCategory: "AI · Offensive Security",
    stack: ["Python", "LLM integration"],
    description: "An autonomous AI penetration testing agent designed for full black-box assessments. Taproot reasons through recon, enumeration, exploitation, and reporting without human hand-holding — simulating the full lifecycle of an adversarial engagement from a single prompt.",
    url: "https://github.com/mal4crypt/taproot",
  },
  {
    title: "Obelisk",
    category: "security tools",
    subCategory: "Systems Engineering",
    stack: ["C++", "Vectorized Engine"],
    description: "A high-performance analytical query engine built in C++ with vectorized execution. Designed for processing large datasets at low latency, Obelisk implements columnar storage, SIMD-optimised operations, and a custom query planner — bringing database internals engineering into a single self-contained system.",
    url: "https://github.com/mal4crypt/obelisk",
  },
  {
    title: "Sigil",
    category: "security tools",
    subCategory: "Security Research",
    stack: ["Custom Fuzzing Engine"],
    description: "A stateful protocol fuzzer and state machine inference engine. Sigil models the behaviour of network protocols as state machines and generates fuzz inputs that drive protocol implementations into unexpected states — surfacing bugs that standard fuzzers never reach.",
    url: "https://github.com/mal4crypt/sigil",
  },
  {
    title: "Casper",
    category: "security tools",
    subCategory: "Network Security",
    stack: ["Network Analysis", "Traffic Inspection"],
    description: "A network traffic analysis engine built for covert channel detection. Casper inspects packet flows for hidden communication channels — timing-based, storage-based, and protocol-steganography techniques — used by malware and advanced persistent threats to exfiltrate data undetected.",
    url: "https://github.com/mal4crypt/casper",
  },
  {
    title: "Kronos",
    category: "security tools",
    subCategory: "Distributed Systems",
    stack: ["Go", "Rust", "Raft"],
    description: "A distributed systems toolkit implementing the Raft consensus algorithm with a fully functional distributed key-value store. Kronos is built for studying and deploying fault-tolerant distributed systems — covering leader election, log replication, snapshotting, and cluster membership changes.",
    url: "https://github.com/mal4crypt/kronos",
  },
  {
    title: "Axiom",
    category: "security tools",
    subCategory: "Formal Verification",
    stack: ["TLA+", "Z3", "CBMC", "SPIN"],
    description: "A formal verification suite integrating TLA+, Z3, CBMC, and SPIN into a unified analysis framework. Axiom allows engineers to model, specify, and verify the correctness of critical systems — from distributed protocols to cryptographic routines — before a single line of production code ships.",
    url: "https://github.com/mal4crypt/axiom",
  },
  {
    title: "ChainGuard",
    category: "security tools",
    subCategory: "Web3 · Security",
    stack: ["EVM", "Solidity", "Static Analysis"],
    description: "A smart contract security analysis platform for EVM-compatible chains. ChainGuard combines static analysis, symbolic execution, and pattern matching to detect vulnerabilities in Solidity contracts — reentrancy, integer overflow, access control failures, and more — with detailed per-finding reports.",
    url: "https://github.com/mal4crypt/chinguard",
  },
  {
    title: "Phantom",
    category: "security tools",
    subCategory: "Digital Forensics",
    stack: ["Memory Forensics", "Process Analysis"],
    description: "A memory forensics and live process analysis toolkit. Phantom dumps, parses, and analyses process memory at runtime — extracting artefacts, detecting injection, identifying rootkit behaviour, and reconstructing execution history from live and captured memory images.",
    url: "https://github.com/mal4crypt/phantom",
  },
  {
    title: "Locksmith",
    category: "security tools",
    subCategory: "Web Security",
    stack: ["Python", "HTTP Analysis"],
    description: "An automated web application security scanner built for coverage and accuracy. Locksmith crawls web applications, maps their attack surface, and runs targeted checks for OWASP Top 10 vulnerabilities — producing structured reports with severity ratings and remediation steps.",
    url: "https://github.com/mal4crypt/locksmith",
  },
  // WEB PLATFORMS
  {
    title: "ODPay Bill Connect",
    category: "web platforms",
    subCategory: "Fintech · Utilities",
    stack: ["Next.js", "Tailwind", "Payments"],
    description: "A utility billing and payment platform built to simplify how individuals and businesses manage essential service payments. ODPay Bill Connect aggregates electricity, water, internet, and other utility payments into a single dashboard.",
    url: "https://odpay-bill-connect.vercel.app/",
  },
  {
    title: "Genova Health",
    category: "web platforms",
    subCategory: "Healthcare · SaaS",
    stack: ["Next.js", "Tailwind", "API"],
    description: "A healthcare coordination system that connects patients, doctors, and logistics in one platform. Genova Health handles appointment booking, medical record access, and prescription tracking.",
    url: "https://genova-health.vercel.app/",
  },
  {
    title: "WSL Interior Studio",
    category: "web platforms",
    subCategory: "Design · Real Estate",
    stack: ["Next.js", "Tailwind", "Premium UI"],
    description: "An interior design platform with a premium presentation layer built for a high-end design studio. WSL Interior Studio showcases portfolios and project galleries with a refined visual identity.",
    url: "https://wsl-interior-studio.vercel.app/",
  },
  {
    title: "Luxury Abode Blueprint",
    category: "web platforms",
    subCategory: "Real Estate",
    stack: ["Next.js", "Tailwind"],
    description: "A real estate showcase platform built for high-end property listings. Luxury Abode Blueprint presents properties with immersive layouts and detailed specification sheets.",
    url: "https://luxury-abode-blueprint.vercel.app/",
  },
  // APPLICATIONS
  {
    title: "Vendora",
    category: "applications",
    subCategory: "E-commerce · SaaS",
    stack: ["Next.js", "Tailwind", "Zustand"],
    description: "An e-commerce and vendor management application built for multi-vendor marketplaces. Vendora handles product listings, inventory management, order processing, and vendor dashboards.",
    url: "https://vendora-chi.vercel.app/",
  },
  // AI SYSTEMS
  {
    title: "Malcrypt AI",
    category: "ai systems",
    subCategory: "AI · Developer Tools",
    stack: ["Python", "LLM", "Multi-Agent"],
    description: "A multi-domain AI assistant built for programming, automation, red teaming, and research workflows. Malcrypt AI routes tasks intelligently across domains — writing and debugging code, running research queries, and more.",
    url: "https://github.com/mal4crypt/malcrypt-ai",
  },
  // FRONTEND LAB
  { title: "Arcland", category: "frontend lab", subCategory: "Real Estate UI", stack: ["Frontend"], description: "High-fidelity real estate platform prototype.", url: "https://arcland-six.vercel.app/" },
  { title: "Cleriq", category: "frontend lab", subCategory: "Business Dashboard", stack: ["Frontend"], description: "Modern business management dashboard UI.", url: "https://cleriq.vercel.app/" },
  { title: "Vantage", category: "frontend lab", subCategory: "Analytics UI", stack: ["Frontend"], description: "Analytics and reporting platform interface.", url: "https://vantage-hazel.vercel.app/" },
  { title: "Zella", category: "frontend lab", subCategory: "E-commerce UI", stack: ["Frontend"], description: "Premium e-commerce storefront prototype.", url: "https://zella-gilt.vercel.app/" },
  { title: "Nestle UI", category: "frontend lab", subCategory: "Property Listing", stack: ["Frontend"], description: "Sleek property listing platform interface.", url: "https://nestle-pi.vercel.app/" },
  { title: "Orion", category: "frontend lab", subCategory: "Fintech UI", stack: ["Frontend"], description: "Investment platform interface exploration.", url: "https://orion-five-plum.vercel.app/" },
  { title: "Payce", category: "frontend lab", subCategory: "Payments UI", stack: ["Frontend"], description: "Clean payment product interface design.", url: "https://payce-teal.vercel.app/" },
  { title: "Dashly", category: "frontend lab", subCategory: "Seller Dashboard", stack: ["Frontend"], description: "E-commerce seller analytics dashboard.", url: "https://dashly-orcin.vercel.app/" },
  { title: "Aily", category: "frontend lab", subCategory: "AI Shopping", stack: ["Frontend"], description: "AI-powered shopping experience prototype.", url: "https://aily-sandy.vercel.app/" },
  { title: "Fortis Pay", category: "frontend lab", subCategory: "Banking UI", stack: ["Frontend"], description: "Digital banking platform interface.", url: "https://fortis-pay.vercel.app/" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security tools": return <Shield className="w-4 h-4" />;
      case "web platforms": return <Layout className="w-4 h-4" />;
      case "ai systems": return <Cpu className="w-4 h-4" />;
      case "applications": return <AppWindow className="w-4 h-4" />;
      case "frontend lab": return <Code2 className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-40 pb-32 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="max-w-4xl mb-20 space-y-6">
            <div className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
              Portfolio
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter lowercase">
              What we've <span className="text-primary italic">built</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              From high-performance query engines and distributed systems to
              autonomous security agents and fintech platforms.
              Engineering excellence across every stack.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-16 pb-8 border-b border-border/30">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-none px-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {getCategoryIcon(cat)}
                <span className="ml-2">{cat}</span>
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/20 border border-border/20 overflow-hidden">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="bg-background rounded-none border-none group relative overflow-hidden flex flex-col h-full hover:bg-card/40 transition-colors">
                <CardContent className="p-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest leading-none">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black tracking-tighter mb-4 lowercase group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                        {tech}{i < project.stack.length - 1 ? " •" : ""}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-10 flex-grow">
                    {project.description}
                  </p>
                  <div className="pt-8 border-t border-border/30 mt-auto flex items-center justify-between font-bold">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link"
                    >
                      {project.url.includes('github') ? 'View Repository' : 'View Project'}
                      <ExternalLink className="ml-2 w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                    {project.url.includes('github') && <Github className="w-4 h-4 text-muted-foreground/30" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-sm text-muted-foreground font-medium mb-6">
              More security tools and research:
            </p>
            <a
              href="https://github.com/mal4crypt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-4 border border-foreground/20 hover:bg-foreground/5 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
            >
              <Github className="mr-3 w-4 h-4" />
              github.com/mal4crypt
            </a>
          </div>
        </div >
      </main >

      <Footer />
    </div >
  );
}
