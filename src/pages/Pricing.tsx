import React, { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Shield, Cpu, Code2, Terminal, Zap, ArrowRight, MessageSquare } from "lucide-react";

const pricingData = {
  security: [
    {
      category: "Penetration Testing",
      tiers: [
        { name: "Basic Assessment", price: "₦200,000", description: "Standard vulnerability mapping and OWASP audit." },
        { name: "Standard Pentest", price: "₦500,000", description: "Deep manual exploitation and remediation roadmap." },
        { name: "Advanced Audit", price: "₦1,200,000", description: "Comprehensive adversarial hardening & red teaming." },
        { name: "Enterprise", price: "From ₦2,500,000", description: "Mission-critical corporate infrastructure audit." }
      ]
    },
    {
      category: "Smart Contract Audit",
      tiers: [
        { name: "Basic", price: "₦1,000,000", description: "Single contract security validation." },
        { name: "Standard", price: "₦2,000,000", description: "Full protocol audit & economic modeling." },
        { name: "Enterprise", price: "From ₦4,000,000", description: "Live mainnet deployment safeguarding." }
      ]
    },
    {
      category: "Recon Reports",
      tiers: [
        { name: "Pro Recon", price: "₦100,000", description: "Detailed digital footprint intelligence report." },
        { name: "Standard Recon", price: "₦180,000", description: "In-depth OSINT and credential leak audit." },
        { name: "Deep Recon", price: "₦350,000", description: "Shadow IT mapping and metadata leak analysis." }
      ]
    }
  ],
  development: [
    {
      category: "Web Development",
      tiers: [
        { name: "Premium Starter", price: "₦150,000", description: "High-performance professional business sites." },
        { name: "Business", price: "₦350,000", description: "Scalable platform with full SEO integration." },
        { name: "Pro Platform", price: "₦800,000", description: "Custom enterprise portals and architectures." },
        { name: "E-commerce", price: "From ₦1,500,000", description: "High-volume secure marketplaces." }
      ]
    },
    {
      category: "Hardened App Development",
      tiers: [
        { name: "Secure MVP", price: "₦1,200,000", description: "Vulnerability-tested MVP for high-risk startups." },
        { name: "Standard App", price: "₦3,000,000", description: "Full-stack mobile/web with encryption baseline." },
        { name: "Pro Architecture", price: "₦6,000,000+", description: "Distributed systems for large-scale users." },
        { name: "Fintech Platform", price: "From ₦10,000,000", description: "Bank-grade security and financial compliance." }
      ]
    },
    {
      category: "Cloud Infrastructure",
      tiers: [
        { name: "Cloud Setup", price: "₦350,000", description: "Secure AWS/Azure/GCP environment builds." },
        { name: "Cost Optimization", price: "₦650,000", description: "Strategic infrastructure cost reduction." },
        { name: "Advanced DevOps", price: "From ₦1,200,000", description: "Full CI/CD & infrastructure-as-code." }
      ]
    },
    {
      category: "Custom Scripts",
      tiers: [
        { name: "Pro Script", price: "₦80,000", description: "High-level automation and data processing." },
        { name: "Standard System", price: "₦150,000", description: "Custom hooks and third-party integrations." },
        { name: "Advanced Worker", price: "₦300,000", description: "Complex background task engines." }
      ]
    }
  ],
  designAI: [
    {
      category: "AI Agent & Automation",
      tiers: [
        { name: "Implementation", price: "₦450,000", description: "Custom AI chatbot with local knowledge base." },
        { name: "RAG System", price: "₦900,000", description: "Advanced autonomous reasoning architecture." },
        { name: "Workforce", price: "₦1,800,000", description: "Total department AI automation suites." },
        { name: "Custom Model", price: "From ₦3,500,000", description: "Fine-tuning and LLM deployment." }
      ]
    },
    {
      category: "UI/UX Brand Direction",
      tiers: [
        { name: "Basic Design", price: "₦150,000", description: "High-fidelity UI and interaction design." },
        { name: "Design System", price: "₦350,000", description: "Comprehensive corporate brand language." },
        { name: "Motion & UI", price: "₦650,000", description: "Advanced high-fidelity UX and animation." },
        { name: "Full Branding", price: "₦1,200,000", description: "360° visual identity and production." }
      ]
    }
  ],
  support: [
    {
      category: "Maintenance",
      tiers: [
        { name: "Website Baseline", price: "₦75,000/mo", description: "Uptime, security, and content management." },
        { name: "App Management", price: "₦250,000/mo", description: "API stability and database health audit." },
        { name: "System Guard", price: "₦180,000/mo", description: "Infrastructure monitoring and patches." },
        { name: "AI Stewardship", price: "₦350,000/mo", description: "Model monitoring and refinement." }
      ]
    },
    {
      category: "Compliance as a Service",
      tiers: [
        { name: "Basic Audit", price: "₦400,000", description: "Initial gap analysis and reporting." },
        { name: "Full Framework", price: "₦850,000", description: "SOC2/ISO27001 readiness production." },
        { name: "Elite Governance", price: "From ₦1,800,000", description: "Continuous compliance and audit guard." }
      ]
    },
    {
      category: "Retainer Plans",
      tiers: [
        { name: "Basic Partner", price: "₦150,000/mo", description: "On-call engineering support hours." },
        { name: "Business Priority", price: "₦400,000/mo", description: "Dedicated architectural leadership." },
        { name: "Elite Retainer", price: "₦1,000,000/mo", description: "Total engineering team outsourcing." }
      ]
    }
  ]
};

export default function Pricing() {
  React.useEffect(() => {
    document.title = "Pricing | ZEXLABS — Investment Tiers";
  }, []);

  const openWhatsApp = (tier: string) => {
    const message = `Hello ZEXLABS Architect! I'm interested in the ${tier} package for my project. Let's discuss the technical requirements and timeline.`;
    window.open(`https://wa.me/2349164703407?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-40 pb-32 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="max-w-4xl mb-24 space-y-6">
            <div className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
              Investment
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Elite <span className="text-primary italic">Investment</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Transparent pricing for world-class security and engineering.
              Pick a tier or consult for a custom engagement.
            </p>
          </div>

          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 md:grid-cols-4 mb-20 p-1 bg-secondary border border-border/50">
              <TabsTrigger value="security" className="text-[10px] font-black uppercase tracking-widest py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Security</TabsTrigger>
              <TabsTrigger value="development" className="text-[10px] font-black uppercase tracking-widest py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Development</TabsTrigger>
              <TabsTrigger value="designAI" className="text-[10px] font-black uppercase tracking-widest py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Design & AI</TabsTrigger>
              <TabsTrigger value="support" className="text-[10px] font-black uppercase tracking-widest py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Support</TabsTrigger>
            </TabsList>

            {Object.entries(pricingData).map(([key, categories]) => (
              <TabsContent key={key} value={key} className="animate-fade-in space-y-24">
                {categories.map((cat, idx) => (
                  <div key={idx} className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-primary pl-8">
                      <div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase">{cat.category}</h2>
                        <p className="text-muted-foreground font-medium mt-2">Professional {cat.category.toLowerCase()} solutions for enterprise and startup needs.</p>
                      </div>
                      <div className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                        {cat.tiers.length} Tiers Available
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {cat.tiers.map((tier, i) => (
                        <PricingCard
                          key={i}
                          tier={{
                            ...tier,
                            cta: tier.price === "Free" ? "Start Free" : "Get Started",
                            features: [] // Simplified for this view, or add defaults
                          }}
                          onCta={() => openWhatsApp(`${cat.category} - ${tier.name}`)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          {/* Luxury Note */}
          <div className="mt-32 p-16 bg-primary/5 border border-primary/10 text-center max-w-4xl mx-auto space-y-8">
            <MessageSquare className="w-10 h-10 text-primary mx-auto" />
            <h2 className="text-4xl font-black tracking-tighter italic">Need a Bespoke Solution?</h2>
            <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
              For large-scale enterprise infrastructure, mission-critical systems, or
              high-confidentiality government contracts, we offer custom retainer-based
              engineering engagements.
            </p>
            <Button
              onClick={() => openWhatsApp("Bespoke")}
              className="rounded-none h-14 px-12 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(227,36,43,0.3)] transition-all"
            >
              Consult an Architect
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PricingCard({ tier, onCta, key }: { tier: any, onCta: () => void, key?: any }) {
  return (
    <Card className={`rounded-none border-border/20 bg-card/40 backdrop-blur-sm group relative flex flex-col h-full transition-all duration-500 ${tier.featured ? 'ring-2 ring-primary ring-offset-4 ring-offset-background' : 'hover:border-primary/30'}`}>
      <CardContent className="p-10 flex flex-col h-full">
        {tier.featured && (
          <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-primary-foreground transform translate-x-2 translate-y-2 rotate-45">
            Recommended
          </div>
        )}

        <h3 className="text-2xl font-black tracking-tighter mb-2">{tier.name}</h3>
        <div className="text-4xl font-black text-primary tracking-tighter mb-6">{tier.price}</div>
        <p className="text-sm text-muted-foreground font-medium mb-10 leading-relaxed">{tier.description}</p>

        <div className="space-y-4 mb-12 flex-grow">
          {tier.features.map((feature: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium text-muted-foreground/80 leading-tight">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={onCta}
          className={`rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] w-full transition-all duration-500 ${tier.featured ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(227,36,43,0.3)]' : 'bg-transparent border-2 border-foreground/10 text-foreground/60 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:opacity-100'}`}
        >
          {tier.cta} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
