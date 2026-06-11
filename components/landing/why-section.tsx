import { Leaf, Factory, Recycle } from "lucide-react";

const items = [
  {
    icon: Recycle,
    title: "Reduce Waste",
    desc: "Divert plastic and cans away from landfills.",
  },
  {
    icon: Leaf,
    title: "Protect Nature",
    desc: "Lower pollution and conserve natural resources.",
  },
  {
    icon: Factory,
    title: "Create Value",
    desc: "Transform waste into usable materials.",
  },
];

function WhySection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">
          Why Recycling Matters
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-card p-8 rounded-2xl shadow-sm">
              <item.icon className="w-10 h-10 mx-auto text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default WhySection;
