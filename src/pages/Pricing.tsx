import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Pricing = () => {
  const packages = [
    {
      name: "Simple Apps",
      price: "₦100,000",
      description: "Basic apps with limited features and simple design",
      features: [
        "One Main Function",
        "Calculator Apps",
        "Flashlight Apps",
        "Note-taking Apps",
        "Quote or Recipe Apps",
        "Basic UI Design",
        "1 Month Support",
      ],
    },
    {
      name: "Starter",
      price: "₦150,000",
      description: "Perfect for small businesses and startups",
      features: [
        "Landing Page",
        "Hosting Setup",
        "Basic SEO",
        "Mobile Responsive",
        "Contact Form",
        "1 Month Support",
      ],
    },
    {
      name: "Growth",
      price: "₦250,000",
      description: "Ideal for growing businesses",
      features: [
        "5-page Website",
        "Advanced Design",
        "AI Chatbot Integration",
        "Marketing Automation",
        "SEO Optimization",
        "Analytics Setup",
        "3 Months Support",
      ],
      featured: true,
    },
    {
      name: "Elite",
      price: "₦400,000+",
      description: "Complete solution for established businesses",
      features: [
        "Full-scale Business Site",
        "Custom Automation",
        "Advanced AI Chatbot",
        "Third-party Integrations",
        "Advanced Analytics",
        "Website Security",
        "6 Months Support",
        "Priority Support",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your <span className="gradient-text">Package</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for world-class web solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`glass glass-hover rounded-lg p-8 relative ${
                  pkg.featured ? "ring-2 ring-accent" : ""
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold gradient-text mb-2">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="https://wa.me/2349164703407" target="_blank" rel="noopener noreferrer">
                  <Button
                    className={`w-full ${
                      pkg.featured
                        ? "bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
                        : "glass glass-hover"
                    }`}
                  >
                    Let's Build It
                  </Button>
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              Need a custom solution? We'd love to discuss your unique requirements.
            </p>
            <Link to="/contact">
              <Button variant="outline" className="glass glass-hover">
                Contact Us for Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
