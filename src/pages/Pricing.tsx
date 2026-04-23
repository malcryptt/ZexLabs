import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Cpu, Zap, ArrowRight } from "lucide-react";

const pricingTiers = [
  {
    name: "Free Recon Report",
    price: "₦0",
    description: "A comprehensive deep-dive into your current digital infrastructure and security posture.",
    icon: <Shield className="w-8 h-8 text-primary" />,
    features: [
      "Full digital footprint discovery",
      "Vulnerability surface mapping",
      "Security posture score",
      "Technology roadmap",
      "1-on-1 technical consultation",
    ],
    cta: "Request Recon",
    primary: false
  },
  {
    name: "Standard",
    price: "₦450,000",
    description: "High-performance development for mission-critical web and mobile applications.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    features: [
      "Custom Web/Mobile Platform",
      "Attacker-resistant architecture",
      "Performance optimization",
      "3 Months priority support",
      "Technical documentation",
      "Basic SEO & Analytics",
    ],
    cta: "Launch Project",
    primary: true
  },
  {
    name: "Custom (Retainer)",
    price: "₦1,250,000+",
    description: "Dedicated engineering and security monitoring for large-scale operations.",
    icon: <Cpu className="w-8 h-8 text-primary" />,
    features: [
      "Dedicated senior engineer",
      "24/7 technical support",
      "Continuous VAPT",
      "Priority feature development",
      "Infrastructure management",
      "Adversarial simulation",
    ],
    cta: "Get in Touch",
    primary: false
  }
];

export default function Pricing() {
  const openWhatsApp = (tier: string) => {
    const message = `Hello ZEXLABS! I'm interested in the ${tier} package. I'd like to discuss how we can work together.`;
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
              Pricing
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter lowercase">
              Transparent <span className="text-primary italic">Investment</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              We don't just bill for hours. We invest in your security and scalability.
              Clear pricing, no hidden fees, elite execution.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`rounded-none border-border/20 overflow-hidden group relative flex flex-col h-full bg-card/10 backdrop-blur-sm transition-all duration-500 ${tier.primary ? 'ring-2 ring-primary ring-offset-4 ring-offset-background' : 'hover:border-primary/30'
                  }`}
              >
                {tier.primary && (
                  <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-[10px] font-black uppercase tracking-widest text-primary-foreground transform translate-x-2 translate-y-2 rotate-45">
                    Popular
                  </div>
                )}

                <CardContent className="p-10 flex flex-col h-full">
                  <div className="mb-10 p-4 bg-primary/5 inline-block group-hover:bg-primary/10 transition-colors">
                    {tier.icon}
                  </div>

                  <h3 className="text-2xl font-black tracking-tighter mb-2 lowercase">
                    {tier.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black tracking-tighter text-primary whitespace-nowrap">
                      {tier.price}
                    </span>
                    {tier.price !== "₦0" && !tier.price.includes("+") && (
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        / project
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground font-medium mb-10 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="space-y-4 mb-12 flex-grow">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => openWhatsApp(tier.name)}
                    className={`rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] w-full group/btn transition-all duration-500 ${tier.primary
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]'
                      : 'bg-transparent border border-foreground/20 hover:bg-foreground host:text-background'
                      }`}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ or Note */}
          <div className="mt-32 p-12 bg-primary/5 border border-primary/10 max-w-4xl mx-auto text-center">
            <h4 className="text-xl font-black tracking-tighter mb-4 lowercase">
              Custom requirements?
            </h4>
            <p className="text-muted-foreground font-medium mb-8">
              Every project is different. If our standard tiers don't fit your vision,
              we'll build a custom engagement model tailored to your specific needs.
            </p>
            <Button
              variant="outline"
              className="rounded-none px-12 py-6 border-primary/20 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => openWhatsApp("Custom")}
            >
              Consult an Engineer
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
