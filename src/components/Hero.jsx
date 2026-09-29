import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'

import { useBooking } from '../hooks/useBooking'
import { reviewSummary } from '../data/reviews'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { openBooking } = useBooking()

  const scrollToRooms = () => {
    document.getElementById('rooms')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      id="home"
      aria-label="Ojas Inn, Talegaon"
      className="relative isolate overflow-hidden bg-[#102337]"
    >
      {/* ============================================================
          MOBILE HERO
          The full landscape photograph is shown without object-cover
          cropping. The content sits below it.
          ============================================================ */}
      <div className="md:hidden">

        {/* Full photograph — NO CROPPING */}
        <div className="relative w-full overflow-hidden bg-[#102337]">
          <motion.img
            src="/images/optimized/hero/frontview.webp"
            alt="Ojas Inn exterior in Talegaon MIDC, Pune"
            width="1672"
            height="941"
            fetchpriority="high"
            decoding="async"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="block h-auto w-full max-w-full"
          />

          {/* Image readability overlay */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-b
              from-black/15
              via-transparent
              to-black/40
            "
          />
        </div>

        {/* Mobile content */}
        <div className="relative bg-[#102337] px-6 pb-10 pt-8">

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: EASE,
            }}
          >
            <div className="flex items-center gap-3 font-sans text-[0.62rem] font-bold uppercase tracking-[0.25em] text-white">
              <span>TALEGAON MIDC</span>
              <span className="h-px w-8 bg-[#DDB86F]" />
              <span>PUNE</span>
            </div>

            <h1 className="mt-4 max-w-[340px] font-display text-[clamp(2.7rem,11vw,4rem)] leading-[0.9] tracking-[-0.035em] text-white">
              Your stay,
              <span className="block text-[#F1E3C4]">
                made comfortable.
              </span>
            </h1>

            <p
              className="mt-4 max-w-[430px] font-sans text-[0.92rem] font-medium leading-6"
              style={{ color: 'rgba(255,255,255,0.90)' }}
            >
              Comfortable rooms and warm hospitality, conveniently located near
              D.Y. Patil University.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => openBooking()}
                className="
                  group inline-flex h-14 w-full
                  items-center justify-center gap-3
                  rounded-full
                  bg-[#E1B65D]
                  px-6
                  font-sans text-[0.7rem]
                  font-bold uppercase
                  tracking-[0.16em]
                  text-[#102337]
                  shadow-[0_12px_35px_rgba(0,0,0,0.20)]
                  transition-all duration-300
                  active:scale-[0.98]
                "
              >
                Book Your Stay

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </button>

              <button
                type="button"
                onClick={scrollToRooms}
                className="
                  group inline-flex h-14 w-full
                  items-center justify-center gap-3
                  rounded-full
                  border border-white/60
                  bg-white/10
                  px-6
                  font-sans text-[0.7rem]
                  font-bold uppercase
                  tracking-[0.16em]
                  text-white
                  backdrop-blur-md
                  transition-all duration-300
                  active:scale-[0.98]
                "
              >
                Explore Rooms

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium text-white/90">
                <MapPin
                  className="h-4 w-4 text-[#E1B65D]"
                  strokeWidth={2}
                />
                Near D.Y. Patil University
              </span>

              <span className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium text-white/90">
                <Star
                  className="h-4 w-4 fill-[#E1B65D] text-[#E1B65D]"
                  strokeWidth={1.5}
                />
                {reviewSummary.rating.toFixed(1)} rating
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          DESKTOP HERO
          Existing desktop presentation preserved.
          ============================================================ */}
      <div className="hidden h-[100svh] min-h-0 md:block">

        <motion.img
          src="/images/optimized/hero/frontview.webp"
          alt="Ojas Inn exterior in Talegaon MIDC, Pune"
          width="1672"
          height="941"
          fetchpriority="high"
          decoding="async"
          initial={reduceMotion ? false : { scale: 1.025 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: `
              linear-gradient(
                90deg,
                rgba(5, 18, 30, 0.78) 0%,
                rgba(5, 18, 30, 0.60) 24%,
                rgba(5, 18, 30, 0.25) 47%,
                rgba(5, 18, 30, 0.04) 72%
              ),
              linear-gradient(
                180deg,
                rgba(5, 18, 30, 0.42) 0%,
                rgba(5, 18, 30, 0.00) 30%,
                rgba(5, 18, 30, 0.18) 100%
              )
            `,
          }}
        />

        <div className="container relative flex h-full items-center pt-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: EASE,
            }}
            className="max-w-[690px]"
          >
            <div className="flex items-center gap-3 font-sans text-[0.68rem] font-bold uppercase tracking-[0.28em] text-white">
              <span>TALEGAON MIDC</span>
              <span className="h-px w-9 bg-[#DDB86F]" />
              <span>PUNE</span>
            </div>

            <h1 className="mt-5 max-w-[680px] font-display text-[clamp(3rem,5.6vw,5.4rem)] leading-[0.91] tracking-[-0.035em] text-white">
              Your stay,
              <span className="block text-[#F1E3C4]">
                made comfortable.
              </span>
            </h1>

            <p
              className="mt-5 max-w-[500px] font-sans text-[1rem] font-medium leading-7"
              style={{ color: 'rgba(255,255,255,0.94)' }}
            >
              Comfortable rooms and warm hospitality, conveniently located near
              D.Y. Patil University.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openBooking()}
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 font-sans text-[0.73rem] font-bold uppercase tracking-[0.16em] text-[#102337] shadow-[0_12px_35px_rgba(0,0,0,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
              >
                Book Your Stay
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </button>

              <button
                type="button"
                onClick={scrollToRooms}
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full border border-white/65 bg-white/10 px-7 py-3.5 font-sans text-[0.73rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/20"
              >
                Explore Rooms
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.8}
                />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-white/90">
                <MapPin
                  className="h-4 w-4 text-[#E1B65D]"
                  strokeWidth={2}
                />
                Near D.Y. Patil University
              </span>

              <span className="h-4 w-px bg-white/35" />

              <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-white/90">
                <Star
                  className="h-4 w-4 fill-[#E1B65D] text-[#E1B65D]"
                  strokeWidth={1.5}
                />
                {reviewSummary.rating.toFixed(1)} rating
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
