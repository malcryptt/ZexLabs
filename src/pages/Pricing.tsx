import React, { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Shield, Cpu, Code2, Terminal, Zap, ArrowRight, MessageSquare } from "lucide-react";

const pricingData = {
  appSecurity: [
    {
      name: "Basic",
      price: "₦150,000",
      description: "Essential security features for mobile and web applications.",
      features: [
        "Basic Vulnerability Scanning",
        "Secure Storage Implementation",
        "OWASP Top 10 Protections",
        "Technical Documentation",
      ],
      cta: "Get Started"
    },
    {
      name: "Standard",
      price: "₦250,000",
      description: "Advanced security with visibility optimizations.",
      features: [
        "Everything in Basic",
        "Google Indexing Setup",
        "API Security Hardening",
        "Data Encryption at Rest",
        "3 Months Support",
      ],
      featured: true,
      cta: "Go Standard"
    },
    {
      name: "Elite",
      price: "₦400,000+",
      description: "The ultimate security and infrastructure package.",
      features: [
        "Everything in Standard",
        "Advanced Penetration Testing",
        "Continuous Monitoring",
        "Free Domain for 1 Year",
        "Priority 24/7 Support",
      ],
      cta: "Join Elite"
    }
  ],
  websiteDev: [
    {
      name: "Basic",
      price: "₦150,000",
      description: "Clean, professional, and fast business websites.",
      features: [
        "Custom UI/UX Design",
        "Mobile Responsive Layout",
        "Essential SEO Optimization",
        "Contact Form Integration",
      ],
      cta: "Build Basic"
    },
    {
      name: "Standard",
      price: "₦250,000",
      description: "High-performance sites with search visibility.",
      features: [
        "Everything in Basic",
        "Google Indexing & Console",
        "Content Management System",
        "Performance Tuning",
        "Analytics Dashboard",
      ],
      featured: true,
      cta: "Scale Up"
    },
    {
      name: "Elite",
      price: "₦400,000+",
      description: "Enterprise-grade web platforms with total protection.",
      features: [
        "Everything in Standard",
        "Advanced Security Baseline",
        "Custom Integrations",
        "Free Domain for 1 Year",
        "Priority Deployment",
      ],
      cta: "Go Enterprise"
    }
  ],
  ai: [
    {
      name: "Basic (AI Tools)",
      price: "₦350,000",
      description: "Leverage AI for bots and workflow automation.",
      features: [
        "Custom AI Chatbots",
        "Automation Tooling",
        "API Integration (OpenAI/Anthropic)",
        "Database Persistence",
      ],
      cta: "Harness AI"
    },
    {
      name: "Agent",
      price: "₦600,000+",
      description: "Fully autonomous agents with dedicated management.",
      features: [
        "Autonomous Reasoning Agent",
        "Custom GUI Dashboard",
        "Integrated Cybersecurity",
        "Maintenance for 1 Month",
        "Scaling Consultation",
      ],
      featured: true,
      cta: "Deploy Agent"
    }
  ],
  specialized: [
    {
      name: "Custom Script",
      price: "₦100,000+",
      description: "Dedicated scripting for specific technical requirements.",
      icon: <Code2 className="w-8 h-8 text-primary" />,
      note: "Price depends on script complexity",
      cta: "Contact Engineer"
    },
    {
      name: "Cyber Security & Pentesting",
      price: "₦150,000+",
      description: "Professional offensive security and surface hardening.",
      icon: <Shield className="w-8 h-8 text-primary" />,
      note: "Custom scope based on infrastructure",
      cta: "Contact Engineer"
    }
  ]
};

export default function Pricing() {
  const openWhatsApp = (tier: string) => {
    const message = `Hello ZEXLABS! I'm interested in the ${tier} package. Let's discuss the technical requirements.`;
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

          <Tabs defaultValue="appSecurity" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 md:grid-cols-4 mb-20 p-1 bg-secondary border border-border/50">
              <TabsTrigger value="appSecurity" className="text-[10px] font-black uppercase tracking-widest py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">App Security</TabsTrigger>
              <TabsTrigger value="websiteDev" className="text-[10px] font-black uppercase tracking-widest py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Website Dev</TabsTrigger>
              <TabsTrigger value="ai" className="text-[10px] font-black uppercase tracking-widest py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">AI Systems</TabsTrigger>
              <TabsTrigger value="specialized" className="text-[10px] font-black uppercase tracking-widest py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Specialized</TabsTrigger>
            </TabsList>

            <TabsContent value="appSecurity" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingData.appSecurity.map((tier, i) => (
                  <PricingCard key={i} tier={tier} onCta={() => openWhatsApp(`App Security - ${tier.name}`)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="websiteDev" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingData.websiteDev.map((tier, i) => (
                  <PricingCard key={i} tier={tier} onCta={() => openWhatsApp(`Website Dev - ${tier.name}`)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pricingData.ai.map((tier, i) => (
                  <PricingCard key={i} tier={tier} onCta={() => openWhatsApp(`AI - ${tier.name}`)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specialized" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pricingData.specialized.map((tier, i) => (
                  <Card key={i} className="rounded-none border-border/20 bg-card/40 backdrop-blur-sm group hover:border-primary/30 transition-all duration-500">
                    <CardContent className="p-12 text-center h-full flex flex-col items-center justify-center space-y-6">
                      <div className="p-4 bg-primary/5 text-primary mb-2">
                        {tier.icon}
                      </div>
                      <h3 className="text-3xl font-black tracking-tighter">{tier.name}</h3>
                      <div className="text-3xl font-black text-primary">{tier.price}</div>
                      <p className="text-muted-foreground font-medium">{tier.description}</p>
                      {tier.note && <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 italic">{tier.note}</p>}
                      <Button
                        onClick={() => openWhatsApp(tier.name)}
                        className="rounded-none h-12 px-10 text-[10px] font-black uppercase tracking-widest border border-foreground/20 bg-transparent hover:bg-primary hover:text-primary-foreground group-hover:border-primary transition-all duration-500"
                      >
                        {tier.cta} <ArrowRight className="ml-2 w-3 h-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
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
          className={`rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] w-full transition-all duration-500 ${tier.featured ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(227,36,43,0.3)]' : 'bg-transparent border border-foreground/20 hover:bg-foreground hover:text-background'}`}
        >
          {tier.cta} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
