import Reveal from './Reveal'

const stages = [
  {
    number: '01',
    title: 'Arrive',
    copy: 'Warm hospitality from the moment you step in.',
  },
  {
    number: '02',
    title: 'Unwind',
    copy: 'Comfortable spaces designed to help you slow down.',
  },
  {
    number: '03',
    title: 'Recharge',
    copy: 'Leave feeling rested and ready for what comes next.',
  },
]

export default function ExperienceSection() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="section border-t border-line bg-bg"
    >
      <div className="container">
        <Reveal as="p" className="eyebrow">
          The Ojas Experience
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="experience-heading"
            className="mt-4 max-w-2xl text-title text-balance"
          >
            Comfort from arrival to departure.
          </h2>
        </Reveal>

        <div className="mt-12 grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
          {stages.map((stage, index) => (
            <Reveal
              key={stage.number}
              delay={index * 0.05}
              y={18}
              className="py-7 md:px-8 md:py-9 first:md:pl-0 last:md:pr-0"
            >
              <p className="font-sans text-2xs uppercase tracking-mega text-gold">
                {stage.number}
              </p>

              <h3 className="mt-4 font-display text-[1.8rem] leading-tight text-ink">
                {stage.title}
              </h3>

              <p className="mt-3 max-w-sm font-sans text-[0.9375rem] leading-relaxed text-muted">
                {stage.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
