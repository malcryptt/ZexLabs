import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Portfolio = () => {
  const projects = [
    {
      title: "E-commerce for luxury brand",
      description: "A high-end shopping experience with seamless checkout",
      category: "E-commerce",
    },
    {
      title: "Landing page for SaaS startup",
      description: "Modern, conversion-focused design with interactive elements",
      category: "SaaS",
    },
    {
      title: "Corporate website redesign",
      description: "Professional brand presence with improved user experience",
      category: "Corporate",
    },
    {
      title: "Restaurant booking platform",
      description: "Intuitive reservation system with real-time availability",
      category: "Hospitality",
    },
    {
      title: "Real estate showcase",
      description: "Stunning property listings with virtual tours",
      category: "Real Estate",
    },
    {
      title: "Creative agency portfolio",
      description: "Bold, artistic showcase of creative work",
      category: "Creative",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our recent work and see how we transform ideas into stunning digital experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-secondary/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-muted-foreground relative z-10">Project Preview</p>
                </div>
                <div className="p-6">
                  <div className="text-xs text-accent mb-2">{project.category}</div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
