import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'

import Reveal from './Reveal'
import { hotelConfig } from '../config/hotelConfig'

const EASE = [0.22, 1, 0.36, 1]

export default function IntroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="intro-heading"
      className="overflow-hidden bg-bg py-14 md:py-20 lg:py-24"
    >
      <div className="container">

        {/* Heading */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal as="p" className="eyebrow">
              The Ojas Experience
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="intro-heading"
                className="
                  mt-3 max-w-3xl
                  font-display
                  text-[clamp(2.2rem,4vw,3.8rem)]
                  leading-[0.98]
                  tracking-[-0.035em]
                  text-ink
                "
              >
                A comfortable stay,
                <span className="block text-gold">
                  without the fuss.
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal
            delay={0.12}
            y={16}
            className="lg:col-span-5 lg:pb-1"
          >
            <p className="max-w-lg font-sans text-[0.95rem] leading-7 text-muted">
              {hotelConfig.hotelName} brings together comfortable rooms,
              thoughtful essentials and warm hospitality in a convenient
              Talegaon MIDC location.
            </p>
          </Reveal>
        </div>

        {/* Main content */}
        <div className="mt-10 grid gap-5 sm:mt-12 lg:mt-16 lg:grid-cols-12">

          {/* EXPERIENCE IMAGE */}
          <Reveal
            delay={0.08}
            y={24}
            className="min-w-0 lg:col-span-7"
          >
            <figure className="group relative overflow-hidden bg-alt">

              <motion.img
                src="/images/optimized/experience/main_receptiosn.webp"
                alt="Reception area at Ojas Inn"
                loading="lazy"
                decoding="async"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
                whileInView={
                  reduceMotion
                    ? undefined
                    : { opacity: 1, scale: 1 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="
                  block
                  h-auto
                  w-full
                  max-w-full
                  object-contain
                  align-middle
                  transition-transform
                  duration-700
                  group-hover:scale-[1.01]
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/30
                  via-transparent
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  bottom-4 left-4
                  flex items-center gap-2
                  rounded-full
                  border border-white/20
                  bg-black/25
                  px-3 py-1.5
                  backdrop-blur-md
                  sm:bottom-5 sm:left-5
                  sm:px-4 sm:py-2
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#E3BE69]" />

                <span
                  className="
                    font-sans
                    text-[0.58rem]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white
                    sm:text-[0.65rem]
                  "
                >
                  Ojas Inn
                </span>
              </div>

            </figure>
          </Reveal>

          {/* INFORMATION PANEL */}
          <Reveal
            delay={0.16}
            y={24}
            className="min-w-0 lg:col-span-5"
          >
            <div
              className="
                flex h-full
                flex-col justify-between
                border border-line
                bg-surface
                p-6
                sm:p-7
                md:p-9
                lg:p-10
              "
            >
              <div>

                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
                  Good to know
                </p>

                <h3
                  className="
                    mt-4 max-w-md
                    font-display
                    text-[1.8rem]
                    leading-tight
                    tracking-[-0.02em]
                    text-ink
                    sm:text-[2rem]
                  "
                >
                  Everything you need for an easy stay.
                </h3>

                <div className="mt-7 divide-y divide-line border-y border-line">

                  <div className="flex items-center gap-4 py-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-alt text-gold">
                      <MapPin
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.6}
                      />
                    </span>

                    <div className="min-w-0">
                      <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">
                        Location
                      </p>

                      <p className="mt-1 font-sans text-[0.9rem] font-medium leading-5 text-ink">
                        Talegaon MIDC, near D.Y. Patil University
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-alt text-gold">
                      <Clock3
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.6}
                      />
                    </span>

                    <div>
                      <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">
                        Front desk
                      </p>

                      <p className="mt-1 font-sans text-[0.9rem] font-medium text-ink">
                        Available 24 hours
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <a
                href="#location"
                className="
                  group mt-7
                  inline-flex w-fit
                  items-center gap-3
                  font-sans text-[0.68rem]
                  font-bold uppercase
                  tracking-[0.16em]
                  text-ink
                  transition-colors
                  duration-300
                  hover:text-gold
                "
              >
                Discover the location

                <ArrowUpRight
                  className="
                    h-4 w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                  strokeWidth={1.6}
                />
              </a>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
