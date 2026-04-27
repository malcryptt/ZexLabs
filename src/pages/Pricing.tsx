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
        { name: "Free Recon", price: "Free", description: "Basic vulnerability surface mapping." },
        { name: "Basic", price: "₦150,000", description: "Standard vulnerability assessment." },
        { name: "Standard", price: "₦350,000", description: "Deep manual penetration testing." },
        { name: "Advanced", price: "₦650,000", description: "Advanced exploitation and reporting." },
        { name: "Enterprise", price: "₦1,200,000", description: "Full-scale corporate infrastructure audit." }
      ]
    },
    {
      category: "Recon Reports",
      tiers: [
        { name: "Free Recon", price: "Free", description: "Initial OSINT gathering." },
        { name: "Standard Recon", price: "₦50,000", description: "Detailed intelligence report." },
        { name: "Deep Recon", price: "₦120,000", description: "Deep web & metadata leak analysis." }
      ]
    }
  ],
  development: [
    {
      category: "Web Development",
      tiers: [
        { name: "Starter", price: "₦80,000", description: "Simple business landing pages." },
        { name: "Business", price: "₦180,000", description: "Professional corporate websites." },
        { name: "Pro", price: "₦350,000", description: "High-performance business platforms." },
        { name: "E-commerce", price: "₦500,000", description: "Full-scale multi-vendor marketplaces." }
      ]
    },
    {
      category: "App Development",
      tiers: [
        { name: "MVP", price: "₦600,000", description: "Minimum Viable Product for startups." },
        { name: "Standard", price: "₦1,200,000", description: "Full-stack mobile/web applications." },
        { name: "Pro", price: "₦2,000,000", description: "Enterprise-grade scalable apps." },
        { name: "Fintech App", price: "₦3,500,000", description: "Highly secure financial platforms." }
      ]
    },
    {
      category: "Custom Systems",
      tiers: [
        { name: "Basic", price: "₦250,000", description: "Internal management tools." },
        { name: "Standard", price: "₦550,000", description: "Custom business logic engines." },
        { name: "Advanced", price: "₦1,000,000", description: "Complex industrial system builds." },
        { name: "Enterprise", price: "₦2,500,000", description: "Nation-wide scaling infrastructure." }
      ]
    },
    {
      category: "Custom Scripts",
      tiers: [
        { name: "Simple", price: "₦30,000", description: "Task-specific automation scripts." },
        { name: "Standard", price: "₦75,000", description: "Complex data scrapers & hooks." },
        { name: "Advanced", price: "₦150,000", description: "Full-scale background worker systems." }
      ]
    }
  ],
  designAI: [
    {
      category: "AI Agent & Automation",
      tiers: [
        { name: "Starter", price: "₦200,000", description: "Simple chatbot & FAQ integration." },
        { name: "Growth", price: "₦450,000", description: "Advanced autonomous RAG systems." },
        { name: "Business", price: "₦800,000", description: "AI department workforce automation." },
        { name: "Enterprise", price: "₦1,500,000", description: "Proprietary model training/tuning." }
      ]
    },
    {
      category: "UI & Frontend Design",
      tiers: [
        { name: "Basic", price: "₦60,000", description: "Single page UI/UX wireframing." },
        { name: "Standard", price: "₦150,000", description: "Complete brand design system." },
        { name: "Pro", price: "₦300,000", description: "High-fidelity motion & layout design." },
        { name: "Brand + UI", price: "₦450,000", description: "Full creative direction & production." }
      ]
    }
  ],
  support: [
    {
      category: "Maintenance",
      tiers: [
        { name: "Website Basic", price: "₦30,000/mo", description: "Server uptime & core updates." },
        { name: "Website Pro", price: "₦120,000/mo", description: "Active management & security." },
        { name: "App Standard", price: "₦100,000/mo", description: "API calls & database upkeep." },
        { name: "System Basic", price: "₦40,000/mo", description: "Infrastructure health monitoring." },
        { name: "AI Pro", price: "₦150,000/mo", description: "Model refinement & drift detection." }
      ]
    },
    {
      category: "Redesign",
      tiers: [
        { name: "Web Refresh", price: "₦80,000", description: "Quick UI styling updates." },
        { name: "Full Web Redesign", price: "₦400,000", description: "Complete platform overhaul." },
        { name: "App Refresh", price: "₦150,000", description: "Mobile layout modernization." },
        { name: "AI Upgrade", price: "₦200,000", description: "Next-gen model swap & logic." }
      ]
    },
    {
      category: "Retainer Plans",
      tiers: [
        { name: "Basic", price: "₦80,000/mo", description: "Shared engineering hours." },
        { name: "Standard", price: "₦200,000/mo", description: "Dedicated priority support." },
        { name: "Pro", price: "₦400,000/mo", description: "On-call engineering leadership." }
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
