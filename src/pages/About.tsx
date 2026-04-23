import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Target, Cpu, Zap, Code2, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-40 pb-32 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mb-32 space-y-8">
            <div className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
              Our Philosophy
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter lowercase leading-[0.9]">
              Engineers who <span className="text-primary italic">think</span> like attackers.
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-3xl leading-relaxed">
              ZEXLABS is a technology agency born at the intersection of development and security.
              We don't just build systems; we harden them against the evolving adversarial landscape.
            </p>
          </div>

          {/* Core Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20 border border-border/20 mb-32">
            <div className="p-16 bg-background space-y-6 group">
              <Shield className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black tracking-tighter lowercase">Security-First Baseline</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Security isn't a feature we add at the end — it's the foundation of every line of code we ship.
                From memory-safe languages to adversarial threat modeling, we build systems that are robust by design.
              </p>
            </div>
            <div className="p-16 bg-background space-y-6 group">
              <Zap className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black tracking-tighter lowercase">Performance Without Compromise</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                We optimize for the extreme. Our systems are built to handle high-concurrency loads with sub-millisecond
                latency, utilizing vectorized execution and high-performance distributed architectures.
              </p>
            </div>
            <div className="p-16 bg-background space-y-6 group">
              <Cpu className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black tracking-tighter lowercase">Autonomous Automation</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                We believe in systems that can reason. Leveraging state-of-the-art LLMs and custom AI agents,
                we automate complex workflows from security scanning to code generation.
              </p>
            </div>
            <div className="p-16 bg-background space-y-6 group">
              <Target className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black tracking-tighter lowercase">Adversarial Simulation</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                To build better defenses, we must understand the attack. We simulate real-world adversarial
                engagements to identify blind spots before malicious actors do.
              </p>
            </div>
          </div>

          {/* Team / Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter lowercase">
                Beyond the <span className="text-primary italic">Interface</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground font-medium font-mono text-sm uppercase tracking-wider">
                <p>
                  [01] We are based in Lagos, Nigeria — a global hub of technical innovation.
                </p>
                <p>
                  [02] Our team consists of software engineers, security researchers, and AI architects.
                </p>
                <p>
                  [03] We operate with a remote-first philosophy, serving clients globally.
                </p>
                <p>
                  [04] Current focus: Web3 security, autonomous agents, and high-performance fintech.
                </p>
              </div>
              <div className="pt-8">
                <blockquote className="border-l-4 border-primary pl-8 py-4 bg-primary/5">
                  <p className="text-2xl font-black tracking-tighter italic text-foreground lowercase">
                    "In a world where everything is connected, nothing is safe. We bridge that gap."
                  </p>
                  <footer className="mt-4 text-xs font-black uppercase tracking-widest text-primary">
                    — The ZEXLABS Methodology
                  </footer>
                </blockquote>
              </div>
            </div>

            <div className="relative aspect-square bg-border/20 border border-border/20 overflow-hidden flex items-center justify-center p-12 group">
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity" style={{
                backgroundImage: 'radial-gradient(circle, #25d366 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}></div>
              <div className="relative z-10 text-center space-y-4">
                <div className="flex justify-center gap-4">
                  <Code2 className="w-12 h-12 text-primary/30" />
                  <Shield className="w-12 h-12 text-primary" />
                  <Globe className="w-12 h-12 text-primary/30" />
                </div>
                <div className="text-[15vw] font-black leading-none tracking-tighter text-primary/10 select-none">
                  ZEX
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
