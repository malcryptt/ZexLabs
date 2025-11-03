import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Smartphone, Settings, MessageSquare, TrendingUp, ShieldCheck, Globe, Wrench } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Website Design",
      description: "Modern, responsive designs that captivate your audience",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Development & Hosting",
      description: "Robust development with reliable hosting solutions",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Chatbot & Automation",
      description: "Intelligent automation to streamline your business",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "SEO & Analytics",
      description: "Data-driven strategies for growth and visibility",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Cyber Security",
      description: "Comprehensive protection for your digital assets",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Domain Sales",
      description: "Secure your perfect domain name for your brand",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Maintenance",
      description: "Ongoing support and updates to keep your site running smoothly",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Building Modern Websites<br />
            <span className="gradient-text">That Mean Business</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We design, develop, and deploy luxury-level sites for brands that want more than average.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose DevLuxe */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose DevLuxe</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-8 min-w-max px-4">
              <div className="glass glass-hover rounded-lg p-8 w-80 flex-shrink-0">
                <h3 className="text-xl font-semibold mb-3 gradient-text">Fast-loading, SEO-ready sites</h3>
                <p className="text-muted-foreground">Optimized for speed and search engines from day one</p>
              </div>
              <div className="glass glass-hover rounded-lg p-8 w-80 flex-shrink-0">
                <h3 className="text-xl font-semibold mb-3 gradient-text">Smart design & clean code</h3>
                <p className="text-muted-foreground">Beautiful interfaces built on solid foundations</p>
              </div>
              <div className="glass glass-hover rounded-lg p-8 w-80 flex-shrink-0">
                <h3 className="text-xl font-semibold mb-3 gradient-text">Tailored for your business goals</h3>
                <p className="text-muted-foreground">Custom solutions that align with your vision</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 glass">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max px-4">
              {services.map((service, index) => (
                <div key={index} className="glass glass-hover rounded-lg p-8 w-80 flex-shrink-0">
                  <div className="text-accent mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Index;
