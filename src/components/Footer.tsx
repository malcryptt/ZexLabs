import { Github, Mail, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-roboto font-black tracking-tighter mb-4 block">
              <span className="text-foreground">ZEX</span>
              <span className="text-primary italic">LABS</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              We Build. We Secure. We Automate.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/mal4crypt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://x.com/ZEXLABS?s=20" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/zexlabs/#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:mal4crypt404@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web & App Design</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Custom Scripts</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Assistants</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cybersecurity</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-foreground mb-6">Work</h4>
            <ul className="space-y-3">
              <li><Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security Tools</Link></li>
              <li><Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web Platforms</Link></li>
              <li><Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Systems</Link></li>
              <li><Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Frontend Lab</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-muted-foreground flex flex-wrap justify-center gap-4">
            <span>🇳🇬 Lagos, Nigeria</span>
            <span>• Remote</span>
            <span>• Serving NG · UK · US</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-muted-foreground">
              © 2026 ZEXLABS. All rights reserved.
            </p>
            <div className="text-[10px] text-muted-foreground/50 tracking-tighter uppercase font-mono">
              Build. Secure. Automate.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
