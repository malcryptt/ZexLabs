import { Github, Mail, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="ZEXLABS" className="h-8 w-auto mix-blend-darken contrast-[1.5] brightness-[1.1]" />
              <div className="flex flex-col -space-y-1">
                <span className="text-lg font-black tracking-tighter text-foreground leading-none">ZEX</span>
                <span className="text-sm font-bold tracking-tighter text-primary italic leading-none">LABS</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              We Build. We Secure. We Automate.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/mal4crypt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://x.com/ZEXLABS?s=20" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/zexlabs/#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/zexlabs" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:xyron.ceo@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
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
            <span>🇳🇬 Ondo & Lagos, Nigeria</span>
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
