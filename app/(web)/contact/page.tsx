"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/shared/Contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold">
              CONTACT US
            </h1>
            <div className="w-64 h-1 bg-secondary mx-auto mt-4" />
          </div>

          {/* Contact Info & Map Section */}
          <div className="bg-background-alt rounded-3xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left - Info Card */}
              <div className="bg-secondary/20 rounded-2xl p-6 flex flex-col justify-center">
                <p className="text-foreground font-medium leading-relaxed mb-6">
                  Contacting us is a step towards a cleaner environment 🌿 —
                  We're here to listen, help you, and grow together on our
                  recycling journey
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-sm text-foreground/80">
                      +1 234 567 890
                    </span>
                  </a>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-sm text-foreground/80">Location</span>
                  </a>
                  <a
                    href="mailto:info@dropme.com"
                    className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-sm text-foreground/80">
                      info@dropme.com
                    </span>
                  </a>
                </div>
              </div>

              {/* Right - Map */}
              <div className="rounded-2xl overflow-hidden h-64 md:h-96">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.7606314141216!2d31.235957!3d30.044444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840a60e0e0e0d%3A0x0!2sRecycling%20Center%20Egypt!5e0!3m2!1sen!2sus!4v1234567890"
                />
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </main>
    </div>
  );
}
