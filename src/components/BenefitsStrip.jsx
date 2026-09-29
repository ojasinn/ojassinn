import { BedDouble, Car, HeartHandshake, Wifi } from 'lucide-react'

const benefits = [
  { id: 'rooms', label: 'Comfortable Rooms', icon: BedDouble },
  { id: 'wifi', label: 'Free Wi-Fi', icon: Wifi },
  { id: 'parking', label: 'Free Parking', icon: Car },
  { id: 'hospitality', label: 'Warm Hospitality', icon: HeartHandshake },
]

export default function BenefitsStrip() {
  return (
    <section
      aria-label="Ojas Inn highlights"
      className="relative z-10 border-b border-line bg-surface"
    >
      <div className="grid grid-cols-2 md:grid-cols-4">
        {benefits.map(({ id, label, icon: Icon }, index) => (
          <div
            key={id}
            className={`
              group flex min-h-[68px] items-center justify-center gap-3
              px-4 py-4
              transition-all duration-300
              hover:bg-alt
              ${
                index !== 0
                  ? 'border-l border-line'
                  : ''
              }
              ${index > 1 ? 'max-md:border-t max-md:border-line' : ''}
            `}
          >
            <Icon
              className="h-[18px] w-[18px] shrink-0 text-gold transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.55}
              aria-hidden="true"
            />

            <span className="font-sans text-[0.82rem] font-medium tracking-[-0.01em] text-ink">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
