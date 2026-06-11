import { Logo } from "./logo";
import {
  Linkedin,
  Instagram,
  Mail,
  Facebook,
  MapPin,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-accent/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Logo />
          </div>

          {/* Contact */}
          <div className="space-y-3 text-sm">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
            >
              <Phone className="w-4 h-4 text-secondary" />
              +1 234 567 890
            </a>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
            >
              <MapPin className="w-4 h-4 text-secondary" />
              Location
            </a>

            <a
              href="mailto:info@dropme.com"
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
            >
              <Mail className="w-4 h-4 text-secondary" />
              info@dropme.com
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3 items-center md:items-start">
            <span className="text-sm font-medium text-muted-foreground">
              Follow us
            </span>
            <div className="flex gap-3">
              {[Linkedin, Instagram, Mail, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center hover:bg-secondary/30 transition"
                >
                  <Icon className="w-4 h-4 text-secondary" />
                </a>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="bg-card rounded-xl p-4 shadow-sm max-w-sm mx-auto md:mx-0">
            <p className="text-xs font-medium text-foreground">
              Our chat will help you complete the process faster.
            </p>
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="What do you want to recycle?"
                className="flex-1 h-9 px-3 text-xs border border-border rounded-md bg-background"
              />
              <button className="h-9 px-4 text-xs font-medium rounded-md bg-secondary text-white hover:bg-secondary/90 transition">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} DROP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
