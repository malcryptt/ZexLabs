import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingCategories = {
    mobile: [
      {
        name: "Simple Apps",
        price: "₦250,000",
        description: "Basic apps with limited features and simple design",
        features: [
          "One Main Function",
          "Calculator or Flashlight Apps",
          "Note-taking Apps",
          "Quote or Recipe Apps",
          "Basic UI Design",
          "1 Month Support",
        ],
      },
      {
        name: "Standard Apps",
        price: "₦450,000",
        description: "Feature-rich apps with better design",
        features: [
          "Multiple Features",
          "Custom UI/UX Design",
          "API Integration",
          "Push Notifications",
          "Offline Functionality",
          "3 Months Support",
        ],
        featured: true,
      },
      {
        name: "Complex Apps",
        price: "₦750,000+",
        description: "Advanced apps with complex functionality",
        features: [
          "Advanced Features",
          "Real-time Updates",
          "Payment Integration",
          "Backend & Database",
          "Analytics Dashboard",
          "6 Months Support",
          "Priority Support",
        ],
      },
    ],
    website: [
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
    ],
    ecommerce: [
      {
        name: "Basic Store",
        price: "₦300,000",
        description: "Essential online store for small inventory",
        features: [
          "Up to 50 Products",
          "Shopping Cart",
          "Payment Gateway",
          "Order Management",
          "Basic Analytics",
          "Mobile Responsive",
          "2 Months Support",
        ],
      },
      {
        name: "Advanced Store",
        price: "₦500,000",
        description: "Full-featured store for growing businesses",
        features: [
          "Unlimited Products",
          "Multiple Payment Options",
          "Inventory Management",
          "Customer Accounts",
          "Email Marketing",
          "Advanced SEO",
          "4 Months Support",
        ],
        featured: true,
      },
      {
        name: "Enterprise Store",
        price: "₦800,000+",
        description: "Complete e-commerce solution",
        features: [
          "Multi-vendor Support",
          "Advanced Analytics",
          "Custom Integrations",
          "AI Recommendations",
          "Multi-currency Support",
          "Dedicated Support",
          "12 Months Support",
          "Priority Support",
        ],
      },
    ],
    redesign: [
      {
        name: "Basic Redesign",
        price: "₦120,000",
        description: "Refresh your existing website",
        features: [
          "UI/UX Improvements",
          "Mobile Optimization",
          "Performance Boost",
          "Content Migration",
          "SEO Updates",
          "2 Months Support",
        ],
      },
      {
        name: "Complete Redesign",
        price: "₦280,000",
        description: "Total website transformation",
        features: [
          "Complete UI/UX Overhaul",
          "Modern Tech Stack",
          "Feature Enhancements",
          "Database Migration",
          "Advanced SEO",
          "Analytics Integration",
          "4 Months Support",
        ],
        featured: true,
      },
    ],
    maintenance: [
      {
        name: "Basic Plan",
        price: "₦11,000/month",
        description: "Essential maintenance and updates",
        features: [
          "Security Updates",
          "Bug Fixes",
          "Content Updates",
          "Monthly Backup",
          "Performance Monitoring",
          "Email Support",
        ],
      },
      {
        name: "Regular Plan",
        price: "₦55,000 bi-annually",
        description: "Regular maintenance and support",
        features: [
          "Everything in Basic",
          "Bi-annual Reviews",
          "Priority Support",
          "Feature Updates",
          "Advanced Analytics",
          "Performance Optimization",
        ],
      },
      {
        name: "Premium Plan",
        price: "₦125,000/yearly",
        description: "Comprehensive yearly maintenance and support",
        features: [
          "Everything in Regular",
          "Annual Strategy Review",
          "24/7 Monitoring",
          "Dedicated Manager",
          "Custom Integrations",
          "Priority Development",
        ],
        featured: true,
      },
    ],
  };

  const renderPackages = (packages: any[], buttonText: string = "Let's Build It") => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
            {pkg.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <a href="https://wa.me/2349131744823" target="_blank" rel="noopener noreferrer">
            <Button
              className={`w-full ${
                pkg.featured
                  ? "bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
                  : "glass glass-hover"
              }`}
            >
              {buttonText}
            </Button>
          </a>
        </div>
      ))}
    </div>
  );

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

          <Tabs defaultValue="mobile" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-12">
              <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
              <TabsTrigger value="website">Websites</TabsTrigger>
              <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
              <TabsTrigger value="redesign">Redesign</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="animate-fade-in">
              {renderPackages(pricingCategories.mobile)}
            </TabsContent>

            <TabsContent value="website" className="animate-fade-in">
              {renderPackages(pricingCategories.website)}
            </TabsContent>

            <TabsContent value="ecommerce" className="animate-fade-in">
              {renderPackages(pricingCategories.ecommerce)}
            </TabsContent>

            <TabsContent value="redesign" className="animate-fade-in">
              {renderPackages(pricingCategories.redesign, "Let's Fix It")}
            </TabsContent>

            <TabsContent value="maintenance" className="animate-fade-in">
              {renderPackages(pricingCategories.maintenance, "Let's Fix It")}
            </TabsContent>
          </Tabs>

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
