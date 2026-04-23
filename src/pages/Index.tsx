import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout, Terminal, Cpu, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const services = [
    {
      icon: <Layout className="w-10 h-10 text-primary" />,
      title: "Web & App Design",
      description: "We design and build production-ready web applications, mobile-first platforms, landing pages, and custom UI systems. Every product we touch is designed with intention — clean architecture, sharp interfaces, and scalable code. Whether you're starting from scratch or redesigning an existing product, we deliver something that looks and works the way it should.",
    },
    {
      icon: <Terminal className="w-10 h-10 text-primary" />,
      title: "Custom Scripts & Automation",
      description: "We write custom tooling, automation scripts, scrapers, bots, data pipelines, and backend utilities tailored specifically to your workflow. If a task is repetitive, manual, or inefficient — we'll eliminate it. From simple one-off scripts to complex multi-step automation systems, we build what you actually need.",
    },
    {
      icon: <Cpu className="w-10 h-10 text-primary" />,
      title: "AI Assistants & Integration",
      description: "We build and deploy AI-powered assistants, agents, and integrations using the latest frontier models. Internal productivity tools, customer-facing chatbots, red team agents, research assistants — we design AI systems that solve real problems and integrate cleanly into your existing stack.",
    },
    {
      icon: <ShieldAlert className="w-10 h-10 text-primary" />,
      title: "Cybersecurity & Penetration Testing",
      description: "We legally break into your systems — web apps, APIs, infrastructure — and show you exactly what's exposed before someone else finds it first. We don't run automated scanners and call it a pentest. We think like the people trying to get in, document every finding with proof, and give your team clear, actionable remediation guidance.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden border-b border-border/30">
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>

        {/* Large Decorative Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none select-none z-0 opacity-[0.02]">
          <span className="text-[25vw] font-black leading-none tracking-tighter uppercase whitespace-nowrap text-[#000]">
            SECURE. BUILD.
          </span>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Identity: ZEXLABS Engineering Group
            </div>

            <div className="flex justify-center mb-8">
              <img src="/logo.png" alt="ZEXLABS" className="h-24 md:h-32 animate-fade-in" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-foreground lowercase">
              We build. <br />
              <span className="text-primary italic">We secure.</span> <br />
              We automate.
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              ZexLabs is a full-service technology agency. We design and build web and mobile products, develop custom scripts and automation, deploy AI assistants, and run offensive security assessments for companies that take their infrastructure seriously.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portfolio" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-10 rounded-none bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest hover:bg-primary/90 w-full group">
                  See Our Work
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-14 px-10 rounded-none border-foreground/20 hover:bg-foreground/5 text-sm uppercase tracking-widest font-black w-full">
                  Get In Touch
                </Button>
              </Link>
            </div>

            <div className="pt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 border-t border-border/20 pt-10">
              <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <CheckCircle2 className="w-3 h-3 text-primary" />
                Based in Nigeria
              </div>
              <div className="hidden sm:block text-border/40">•</div>
              <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                Serving NG · UK · US · Remote
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4 bg-card/30 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 pb-8 border-b border-border/50">
            <div className="space-y-4 max-w-2xl">
              <div className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
                Capabilities
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter lowercase">
                Our <span className="text-primary italic">Services</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 border border-border/30 overflow-hidden">
            {services.map((service, index) => (
              <div key={index} className="bg-background p-12 group hover:bg-card/40 transition-colors">
                <div className="mb-6 p-4 border border-border/50 inline-block bg-card/50 group-hover:bg-primary/5 group-hover:border-primary/30 transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4 lowercase">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium mb-8">
                  {service.description}
                </p>
                <Link to="/contact" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-glow transition-colors">
                  Inquire For Project <ArrowRight className="ml-2 w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
