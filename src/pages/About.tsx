import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DollarSign, Award, Headphones, Zap, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const About = () => {
  const aboutScrollRef = useRef<HTMLDivElement>(null);
  const whyChooseScrollRef = useRef<HTMLDivElement>(null);
  const [aboutScroll, setAboutScroll] = useState({ canScrollLeft: false, canScrollRight: true });
  const [whyChooseScroll, setWhyChooseScroll] = useState({ canScrollLeft: false, canScrollRight: true });

  const checkScroll = (element: HTMLDivElement | null, setScroll: (value: any) => void) => {
    if (!element) return;
    const canScrollLeft = element.scrollLeft > 0;
    const canScrollRight = element.scrollLeft < element.scrollWidth - element.clientWidth - 10;
    setScroll({ canScrollLeft, canScrollRight });
  };

  useEffect(() => {
    const aboutEl = aboutScrollRef.current;
    const whyChooseEl = whyChooseScrollRef.current;

    const handleAboutScroll = () => checkScroll(aboutEl, setAboutScroll);
    const handleWhyChooseScroll = () => checkScroll(whyChooseEl, setWhyChooseScroll);

    if (aboutEl) {
      aboutEl.addEventListener('scroll', handleAboutScroll);
      checkScroll(aboutEl, setAboutScroll);
    }
    if (whyChooseEl) {
      whyChooseEl.addEventListener('scroll', handleWhyChooseScroll);
      checkScroll(whyChooseEl, setWhyChooseScroll);
    }

    return () => {
      aboutEl?.removeEventListener('scroll', handleAboutScroll);
      whyChooseEl?.removeEventListener('scroll', handleWhyChooseScroll);
    };
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const scrollAmount = 400;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Elegant About watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <div className="text-[18vw] font-bold opacity-[0.06] bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent rotate-[-10deg] whitespace-nowrap">
            ABOUT US
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About <span className="gradient-text">DevLuxe</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Building the future, one website at a time
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              {aboutScroll.canScrollLeft && (
                <button
                  onClick={() => scroll(aboutScrollRef, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass glass-hover rounded-full p-2 shadow-lg"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {aboutScroll.canScrollRight && (
                <button
                  onClick={() => scroll(aboutScrollRef, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass glass-hover rounded-full p-2 shadow-lg"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
              <div ref={aboutScrollRef} className="overflow-x-auto pb-4 no-scrollbar">
                <div className="flex gap-8 min-w-max px-4">
                <div className="glass glass-hover rounded-lg p-8 animate-fade-in w-96 flex-shrink-0">
                  <h2 className="text-2xl font-bold mb-4 gradient-text">Our Philosophy</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    At DevLuxe, we blend luxury design and functional tech to help businesses grow faster online.
                    We believe that every website should be more than just a digital presence—it should be a 
                    powerful tool that drives results and creates meaningful connections with your audience.
                  </p>
                </div>

                <div className="glass glass-hover rounded-lg p-8 animate-fade-in w-96 flex-shrink-0">
                  <h2 className="text-2xl font-bold mb-4 gradient-text">Built for Speed. Designed for Impact.</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    We don't just build websites—we craft digital experiences that leave lasting impressions.
                    Our approach combines cutting-edge technology with timeless design principles to create
                    websites that are not only beautiful but also fast, secure, and optimized for conversions.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Every project we undertake is an opportunity to push boundaries and exceed expectations.
                    We're passionate about what we do, and that passion shows in every pixel, every line of code,
                    and every user interaction.
                  </p>
                </div>

                <div className="glass glass-hover rounded-lg p-8 animate-fade-in w-96 flex-shrink-0">
                  <h2 className="text-2xl font-bold mb-4 gradient-text">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To empower businesses with world-class web solutions that drive growth, enhance brand
                    presence, and deliver exceptional user experiences. We're committed to staying at the
                    forefront of web technology while maintaining a human-centered approach to design.
                  </p>
                </div>
                </div>
              </div>
            </div>

            <div className="glass glass-hover rounded-lg p-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Why Choose Us</h2>
              <div className="relative">
                {whyChooseScroll.canScrollLeft && (
                  <button
                    onClick={() => scroll(whyChooseScrollRef, 'left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass glass-hover rounded-full p-2 shadow-lg"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                {whyChooseScroll.canScrollRight && (
                  <button
                    onClick={() => scroll(whyChooseScrollRef, 'right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass glass-hover rounded-full p-2 shadow-lg"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
                <div ref={whyChooseScrollRef} className="overflow-x-auto pb-4 no-scrollbar">
                  <div className="flex gap-6 min-w-max px-4">
                  <div className="flex flex-col items-center text-center p-4 w-72 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Flexible Prices</h3>
                    <p className="text-muted-foreground">
                      Customizable packages that fit your budget without compromising quality
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 w-72 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Professional Level Results</h3>
                    <p className="text-muted-foreground">
                      High-quality deliverables that meet industry standards and exceed expectations
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 w-72 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                      <Headphones className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Top-Notch Customer Service</h3>
                    <p className="text-muted-foreground">
                      Dedicated support team ready to assist you every step of the way
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 w-72 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
                    <p className="text-muted-foreground">
                      Quick turnaround times and prompt communication to keep your project moving
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 w-72 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Purpose-Driven Services</h3>
                    <p className="text-muted-foreground">
                      Solutions tailored to your specific goals and designed to drive real results
                    </p>
                  </div>
                </div>
              </div>
            </div>

            </div>

            <div className="container mx-auto max-w-4xl">
              <div className="text-center mt-12">
                <p className="text-2xl font-semibold mb-4">Ready to start your project?</p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all"
                >
                  Let's Talk
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

export default About;
