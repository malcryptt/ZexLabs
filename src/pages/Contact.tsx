import React, { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, MapPin, Send, Github, Instagram, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | ZEXLABS — Get In Touch";
  }, []);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hello ZEXLABS! My name is ${formData.name}. \n\nSubject: ${formData.subject}\n\n${formData.message}`;
    window.open(`https://wa.me/2349164703407?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

    toast({
      title: "Opening WhatsApp...",
      description: "You're being redirected to chat with our engineering team.",
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUri = `mailto:hello@zexlabs.com.ng?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUri;

    toast({
      title: "Opening Email Client...",
      description: "Dispatching your inquiry to hello@zexlabs.com.ng",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-40 pb-32 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="max-w-4xl mb-24 space-y-6">
            <div className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
              Get in Touch
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              Start the <span className="text-primary italic">Conversation</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Whether you're looking for a full system audit or a custom-built
              platform, our engineers are ready to build with you. We operate from Ondo and Lagos States, serving clients globally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="group flex items-start gap-6">
                  <div className="p-4 bg-primary/5 border border-primary/10 transition-colors group-hover:bg-primary/10">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Technical Support</h4>
                    <p className="text-xl font-bold tracking-tight">+234 913 174 4823</p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Call us directly for urgent inquiries.</p>
                  </div>
                </div>

                <div className="group flex items-start gap-6">
                  <div className="p-4 bg-primary/5 border border-primary/10 transition-colors group-hover:bg-primary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Email Inquiry</h4>
                    <p className="text-xl font-bold tracking-tight">hello@zexlabs.com.ng</p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Inquiries are sent directly to our executive team.</p>
                  </div>
                </div>

                <div className="group flex items-start gap-6">
                  <div className="p-4 bg-primary/5 border border-primary/10 transition-colors group-hover:bg-primary/10">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Operations</h4>
                    <p className="text-xl font-bold tracking-tight">Ondo & Lagos, Nigeria</p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Serving clients globally from West Africa's tech hubs.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border/20">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Social Nodes</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/mal4crypt" target="_blank" rel="noopener noreferrer" className="p-4 border border-border/20 hover:border-primary transition-all group">
                    <Github className="w-5 h-5 group-hover:text-primary" />
                  </a>
                  <a href="https://x.com/ZEXLABS?s=20" target="_blank" rel="noopener noreferrer" className="p-4 border border-border/20 hover:border-primary transition-all group">
                    <Twitter className="w-5 h-5 group-hover:text-primary" />
                  </a>
                  <a href="https://www.instagram.com/zexlabs/#" target="_blank" rel="noopener noreferrer" className="p-4 border border-border/20 hover:border-primary transition-all group">
                    <Instagram className="w-5 h-5 group-hover:text-primary" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="rounded-none border-border/20 bg-card/10 backdrop-blur-sm shadow-none">
              <CardContent className="p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Full Name</label>
                        <Input
                          required
                          placeholder="Your Name"
                          className="rounded-none border-border/20 bg-transparent h-12 focus:border-primary transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Email Address</label>
                        <Input
                          required
                          type="email"
                          placeholder="name@company.com"
                          className="rounded-none border-border/20 bg-transparent h-12 focus:border-primary transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary">Subject</label>
                      <Input
                        required
                        placeholder="Security Audit / New Platform / Retainer"
                        className="rounded-none border-border/20 bg-transparent h-12 focus:border-primary transition-all"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary">Message</label>
                      <Textarea
                        required
                        placeholder="Tell us about your technical requirements..."
                        className="rounded-none border-border/20 bg-transparent min-h-[160px] focus:border-primary transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="w-full rounded-none h-14 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] group"
                    >
                      Chat on WhatsApp
                      <MessageSquare className="ml-3 w-4 h-4 transition-transform group-hover:scale-110" />
                    </Button>
                    <Button
                      type="button"
                      onClick={handleEmailSubmit}
                      className="w-full rounded-none h-14 bg-transparent border-2 border-primary text-primary font-black uppercase tracking-[0.2em] group hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      Deliver via Email
                      <Mail className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
