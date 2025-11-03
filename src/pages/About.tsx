import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DollarSign, Award, Headphones, Zap, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">DevLuxe</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Building the future, one website at a time
            </p>
          </div>

          <div className="space-y-8">
            <div className="overflow-x-auto pb-4 no-scrollbar">
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

            <div className="glass glass-hover rounded-lg p-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Why Choose Us</h2>
              <div className="overflow-x-auto pb-4 no-scrollbar">
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
      </main>

      <Footer />
    </div>
  );
};

export default About;
