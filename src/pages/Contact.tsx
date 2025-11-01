import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Instagram, Mail, Phone, MessageCircle, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      contactSchema.parse(formData);

      // Create WhatsApp message with form data
      const message = `Hello! I'm interested in your services.\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`;
      
      const whatsappUrl = `https://wa.me/2349164703407?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Redirecting to WhatsApp",
        description: "Your message has been prepared.",
      });

      setFormData({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.errors?.[0]?.message || "Please check your form inputs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to bring your vision to life? Get in touch with us today
            </p>
          </div>

          {/* Customer Support Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass glass-hover rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Phone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-muted-foreground mb-3">
                Speak with our team directly
              </p>
              <a
                href="tel:+2349164703407"
                className="text-accent hover:underline font-medium"
              >
                +234 916 470 3407
              </a>
            </div>

            <div className="glass glass-hover rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp Chat</h3>
              <p className="text-muted-foreground mb-3">
                Quick responses via WhatsApp
              </p>
              <a
                href="https://wa.me/2349164703407"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-medium"
              >
                Start Chat
              </a>
            </div>

            <div className="glass glass-hover rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Hours</h3>
              <p className="text-muted-foreground mb-3">
                We're here to help you
              </p>
              <p className="text-accent font-medium">
                Mon-Fri: 9AM - 6PM WAT
              </p>
            </div>
          </div>

          <div className="glass glass-hover rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    required
                    className="mt-1 glass"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email / WhatsApp</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="mt-1 glass"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => handleChange("projectType", value)}
                  >
                    <SelectTrigger className="mt-1 glass">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website Design</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="redesign">Website Redesign</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => handleChange("budget", value)}
                  >
                    <SelectTrigger className="mt-1 glass">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">₦100,000 - ₦200,000</SelectItem>
                      <SelectItem value="growth">₦200,000 - ₦300,000</SelectItem>
                      <SelectItem value="elite">₦300,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={6}
                  required
                  className="mt-1 glass resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-center text-muted-foreground mb-4">
                Prefer to chat directly?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://instagram.com/devluxe.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:underline"
                >
                  <Instagram size={20} />
                  @devluxe.agency
                </a>
                <a
                  href="mailto:mal4crypt404@gmail.com"
                  className="flex items-center gap-2 text-accent hover:underline"
                >
                  <Mail size={20} />
                  mal4crypt404@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
