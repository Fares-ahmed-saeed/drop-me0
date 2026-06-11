import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Recycle, MapPin, Gift, Leaf } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Recycle,
    title: "Collect Recyclables",
    description:
      "Gather your plastic bottles, cans, and other recyclable materials.",
  },
  {
    icon: MapPin,
    title: "Find a Drop Point",
    description: "Locate the nearest Drop Me recycling machine using our app.",
  },
  {
    icon: Leaf,
    title: "Drop & Scan",
    description:
      "Insert your recyclables and scan your QR code to earn points.",
  },
  {
    icon: Gift,
    title: "Earn Rewards",
    description:
      "Convert your points to money or use them for exclusive rewards.",
  },
];

export default function RecyclePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-4">
              Start Recycling Today
            </h1>
            <p className="text-foreground/80 max-w-2xl mx-auto text-lg">
              Join thousands of people making a difference. Every bottle counts
              towards a cleaner planet.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl text-secondary text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 text-center shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-secondary rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Create an account today and start earning rewards while helping
              the environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                Create Account
              </Link>
              <Link
                href="/about"
                className="bg-white text-secondary px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
