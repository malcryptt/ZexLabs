import { Check, Smartphone, Globe, ShoppingCart, Paintbrush, Wrench, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Pricing = () => {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domainYears, setDomainYears] = useState("1");
  const [scrollStates, setScrollStates] = useState<{ [key: string]: { canScrollLeft: boolean, canScrollRight: boolean } }>({});
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const checkScroll = (key: string) => {
    const element = scrollRefs.current[key];
    if (!element) return;
    const canScrollLeft = element.scrollLeft > 0;
    const canScrollRight = element.scrollLeft < element.scrollWidth - element.clientWidth - 10;
    setScrollStates(prev => ({ ...prev, [key]: { canScrollLeft, canScrollRight } }));
  };

  useEffect(() => {
    const handleScroll = (key: string) => () => checkScroll(key);
    const listeners: { [key: string]: () => void } = {};

    Object.keys(scrollRefs.current).forEach(key => {
      const element = scrollRefs.current[key];
      if (element) {
        listeners[key] = handleScroll(key);
        element.addEventListener('scroll', listeners[key]);
        checkScroll(key);
      }
    });

    return () => {
      Object.keys(listeners).forEach(key => {
        const element = scrollRefs.current[key];
        if (element) {
          element.removeEventListener('scroll', listeners[key]);
        }
      });
    };
  }, []);

  const scroll = (key: string, direction: 'left' | 'right') => {
    const element = scrollRefs.current[key];
    if (!element) return;
    const scrollAmount = 400;
    element.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = (text: string) => {
    const whatsappUrl = `https://wa.me/2349164703407?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const domainPricing = [
    { extension: ".com", price: "₦30,000" },
    { extension: ".net", price: "₦25,000" },
    { extension: ".org", price: "₦25,000" },
    { extension: ".info", price: "₦25,000" },
    { extension: ".biz", price: "₦22,000" },
    { extension: ".online/.site/.store", price: "₦30,000" },
    { extension: ".ng", price: "₦25,000" },
    { extension: ".com.ng", price: "₦20,000" },
    { extension: ".org.ng", price: "₦20,000" },
    { extension: ".edu.ng", price: "₦20,000" },
    { extension: "Premium Domains", price: "up to $100,000" },
    { extension: ".tech", price: "₦70,000" },
    { extension: ".app", price: "₦40,000" },
    { extension: ".ai", price: "₦250,000" },
    { extension: ".me", price: "₦40,000" },
    { extension: ".xyz", price: "₦25,000" },
  ];

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

  const renderPackages = (packages: any[], buttonText: string = "Let's Build It", categoryLabel?: string, scrollKey?: string) => (
    <div className="relative">
      {scrollKey && scrollStates[scrollKey]?.canScrollLeft && (
        <button
          onClick={() => scroll(scrollKey, 'left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass glass-hover rounded-full p-2 shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {scrollKey && scrollStates[scrollKey]?.canScrollRight && (
        <button
          onClick={() => scroll(scrollKey, 'right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass glass-hover rounded-full p-2 shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
      <div 
        ref={el => { if (scrollKey) scrollRefs.current[scrollKey] = el; }}
        className="overflow-x-auto pb-4 no-scrollbar"
      >
        <div className="flex gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-2 min-w-max">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`glass glass-hover rounded-lg p-4 sm:p-6 lg:p-8 relative w-72 md:w-96 lg:w-[450px] flex-shrink-0 ${
              pkg.featured ? "ring-2 ring-accent" : ""
            }`}
          >
          {pkg.featured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
          )}
          
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">{pkg.name}</h3>
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{pkg.price}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">{pkg.description}</p>
          </div>

          <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            {pkg.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            className={`w-full ${
              pkg.featured
                ? "bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
                : "glass glass-hover"
            }`}
            onClick={() => {
              const featuresText = pkg.features.map((f: string, idx: number) => `${idx + 1}. ${f}`).join('\n');
              const message = `Hello! I'm interested in your services.\n\n📦 SERVICE: ${categoryLabel || 'Package'}\n💼 PACKAGE: ${pkg.name}\n💰 PRICE: ${pkg.price}\n\n📋 DESCRIPTION:\n${pkg.description}\n\n✨ FEATURES:\n${featuresText}\n\nPlease provide more details and how to proceed.`;
              openWhatsApp(message);
            }}
          >
            {buttonText}
          </Button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );

  return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Pricing watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <div className="text-[14vw] font-bold opacity-[0.07] bg-gradient-to-br from-primary-glow via-primary to-accent bg-clip-text text-transparent rotate-[-20deg] whitespace-nowrap tracking-wide">
            PRICING
          </div>
        </div>
        
        {/* Subtle line pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)`,
        }}></div>
        
        <Navigation />

      <main className="pt-32 pb-20 px-4 relative z-10">
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
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-3 sm:grid-cols-6 mb-8 sm:mb-12 gap-1 sm:gap-1 h-auto p-1">
              <TabsTrigger value="mobile" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <Smartphone className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Mobile</span>
              </TabsTrigger>
              <TabsTrigger value="website" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <Globe className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Website</span>
              </TabsTrigger>
              <TabsTrigger value="ecommerce" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <ShoppingCart className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Shop</span>
              </TabsTrigger>
              <TabsTrigger value="redesign" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <Paintbrush className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Redesign</span>
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <Wrench className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Maintain</span>
              </TabsTrigger>
              <TabsTrigger value="others" className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <MoreHorizontal className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Others</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="animate-fade-in">
              {renderPackages(pricingCategories.mobile, "Let's Build It", 'Mobile App', 'mobile')}
            </TabsContent>

            <TabsContent value="website" className="animate-fade-in">
              {renderPackages(pricingCategories.website, "Let's Build It", 'Website', 'website')}
            </TabsContent>

            <TabsContent value="ecommerce" className="animate-fade-in">
              {renderPackages(pricingCategories.ecommerce, "Let's Build It", 'E-commerce', 'ecommerce')}
            </TabsContent>

            <TabsContent value="redesign" className="animate-fade-in">
              {renderPackages(pricingCategories.redesign, "Let's Fix It", 'Redesign', 'redesign')}
            </TabsContent>

            <TabsContent value="maintenance" className="animate-fade-in">
              {renderPackages(pricingCategories.maintenance, "Let's Fix It", 'Maintenance', 'maintenance')}
            </TabsContent>

            <TabsContent value="others" className="animate-fade-in">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Domain Section */}
                <div className="glass glass-hover rounded-lg p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-2">Domain</h3>
                    <p className="text-muted-foreground">Choose your domain extension</p>
                    <div className="mt-4 p-3 glass rounded-lg">
                      <p className="text-sm text-muted-foreground italic">
                        * Domain services are only available when building a website with us
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                      <SelectTrigger className="w-full h-14 text-lg">
                        <SelectValue placeholder="Select domain extension" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {domainPricing.map((domain, index) => (
                          <SelectItem key={index} value={domain.extension}>
                            <div className="flex justify-between items-center w-full gap-4">
                              <span className="font-medium">{domain.extension}</span>
                              <span className="text-accent font-bold">{domain.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Subscription Duration
                      </label>
                      <Select value={domainYears} onValueChange={setDomainYears}>
                        <SelectTrigger className="w-full h-14 text-lg">
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="1">1 Year</SelectItem>
                          <SelectItem value="2">2 Years</SelectItem>
                          <SelectItem value="3">3 Years</SelectItem>
                          <SelectItem value="4">4 Years</SelectItem>
                          <SelectItem value="5">5 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedDomain && (
                      <div className="text-center p-6 glass rounded-lg animate-fade-in">
                        <p className="text-sm text-muted-foreground mb-2">Selected Domain</p>
                        <p className="text-2xl font-bold gradient-text">
                          {domainPricing.find(d => d.extension === selectedDomain)?.price}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          for {domainYears} {parseInt(domainYears) === 1 ? 'year' : 'years'}
                        </p>
                      </div>
                    )}

                    <Button
                      className="w-full h-14 text-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
                      onClick={() => {
                        const selectedPrice = domainPricing.find(d => d.extension === selectedDomain)?.price;
                        const message = selectedDomain
                          ? `Hello! I'm interested in your services.\n\n🌐 SERVICE: Domain Registration\n📝 EXTENSION: ${selectedDomain}\n⏰ DURATION: ${domainYears} ${parseInt(domainYears) === 1 ? 'year' : 'years'}\n💰 PRICE: ${selectedPrice}\n\n* This domain is for a website I'm building with DevLuxe Agency\n\nPlease provide more details and how to proceed.`
                          : 'Hello! I need help choosing a domain for my website project with DevLuxe Agency.';
                        openWhatsApp(message);
                      }}
                    >
                      Get Domain
                    </Button>
                  </div>
                </div>

                {/* Website Security Section */}
                <div className="glass glass-hover rounded-lg p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-2">Website Security</h3>
                    <p className="text-muted-foreground">Protect your website and users</p>
                    <div className="mt-4 p-3 glass rounded-lg">
                      <p className="text-sm text-muted-foreground italic">
                        * Security packages are only available when building your website with us
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 glass rounded-lg">
                      <span className="font-medium">Captcha</span>
                      <span className="text-accent font-bold">₦25,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 glass rounded-lg">
                      <span className="font-medium">TLS/SSL Certificate</span>
                      <span className="text-accent font-bold">₦35,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 glass rounded-lg">
                      <span className="font-medium">Password Breach Protection (HIBP Check)</span>
                      <span className="text-accent font-bold">₦35,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 glass rounded-lg">
                      <span className="font-medium">HSTS</span>
                      <span className="text-accent font-bold">₦35,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 glass rounded-lg">
                      <span className="font-medium">Secure Cookie Handling</span>
                      <span className="text-accent font-bold">₦35,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 glass rounded-lg">
                      <span className="font-medium">Cloudflare Security Integration</span>
                      <span className="text-accent font-bold">₦35,000</span>
                    </div>

                    <Button
                      className="w-full h-14 text-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow mt-6"
                      onClick={() => {
                        const message = `Hello! I'm interested in your services.\n\n🔒 SERVICE: Website Security Package\n\n📋 AVAILABLE OPTIONS:\n1. Captcha - ₦25,000\n2. TLS/SSL Certificate - ₦35,000\n3. Password Breach Protection (HIBP Check) - ₦35,000\n4. Secure Cookie Handling - ₦35,000\n5. Cloudflare Security Integration - ₦35,000\n\n* Security packages are available when building my website with DevLuxe Agency\n\nPlease provide more details and how to proceed.`;
                        openWhatsApp(message);
                      }}
                    >
                      Get Security Package
                    </Button>
                  </div>
                </div>
              </div>
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
