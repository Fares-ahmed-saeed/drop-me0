const stats = [
  { value: "500+", label: "Tons Recycled" },
  { value: "120+", label: "Community Partners" },
  { value: "100K+", label: "Plastic Items Saved" },
];

export function ImpactSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="text-4xl font-bold mb-2">{stat.value}</div>
            <p className="text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
