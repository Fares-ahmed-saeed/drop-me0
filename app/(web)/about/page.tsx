import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const stats = [
  { value: "109+", label: "Employees" },
  { value: "17+", label: "Offices" },
  { value: "185+", label: "Project Awards" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold">
              ABOUT US
            </h1>
            <div className="w-64 h-1 bg-secondary mx-auto mt-4" />
          </div>

          {/* Description */}
          <p className="text-center text-foreground/80 max-w-3xl mx-auto mb-12 text-lg">
            Drop Me is a leading environmental technology firm dedicated to
            leveraging cutting-edge innovations to redefine the concept of
            recycling. We strive to empower communities through smart systems
            that integrate operational efficiency with environmental
            sustainability, contributing to a future built on a circular economy
          </p>

          {/* Team Image */}
          <div className="relative rounded-2xl overflow-hidden mb-12 max-w-4xl mx-auto">
            <Image
              src="/team-presentation-recycling-event.jpg"
              alt="Drop Me Team"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>

          {/* Stats */}
          <div className="bg-card rounded-2xl shadow-sm p-8 max-w-3xl mx-auto mb-12">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-muted font-serif text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mission */}
            <div className="bg-secondary/10 rounded-3xl p-8">
              <h2 className="font-serif text-2xl text-foreground font-bold mb-4 text-center">
                Our Mission
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Contacting us is a step towards a cleaner environment 🌿 — We're
                here to listen, help you, and grow together on our recycling
                journey.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-background-alt rounded-3xl p-8 relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary/20 rounded-full" />
              <h2 className="font-serif text-2xl text-foreground font-bold mb-4 text-center">
                Our Vision
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Create a future where plastic waste is no longer a burden, but a
                valuable resource that can be transformed into new, sustainable
                products — contributing to a cleaner environment and a greener
                planet.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
