import Image from "next/image"
import Link from "next/link"

const programs = [
  {
    title: "Plastic-to-Value Program",
    description: "Transforming waste plastic into useful material. Reducing waste, creating value.",
    image: "/plastic-recycling-program.png",
    color: "text-secondary",
  },
  {
    title: "Community Plastic-Collection Initiatives",
    description: "Collecting plastic to reduce landfill waste. Together, we keep plastic out of landfills.",
    image: "/drop-me-exhibition.png",
    color: "text-primary",
  },
  {
    title: "Awareness & Education Program",
    description: "Teaching people how to recycle smarter.",
    image: "/drop-me-machine-use.png",
    color: "text-secondary",
  },
  {
    title: "Eco-Innovation Support",
    description: "Supporting creative projects using recycled plastic.",
    image: "/drop-me-vending-machine.png",
    color: "text-primary",
  },
]

export function ProgramsSection() {
  return (
    <section className="bg-card py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Impact Programs — Plastic Recycling</h2>
          <p className="text-foreground/80 max-w-3xl mx-auto text-lg">
            Our initiatives are designed to maximize environmental benefits, support communities, and promote
            sustainable development. Each program reflects our commitment to transforming waste into meaningful change.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] relative">
                <Image src={program.image || "/placeholder.svg"} alt={program.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className={`font-semibold text-sm mb-2 ${program.color}`}>{program.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{program.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            about
          </Link>
        </div>
      </div>
    </section>
  )
}
