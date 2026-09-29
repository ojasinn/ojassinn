import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'

import Reveal from './Reveal'
import { hotelConfig } from '../config/hotelConfig'
import { useBooking } from '../hooks/useBooking'
import { generalInquiryMessage, openWhatsApp, telUrl } from '../utils/whatsapp'

export default function FinalCTA() {
  const sectionRef = useRef(null)
  const { openBooking } = useBooking()
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="book"
      ref={sectionRef}
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-[#0B1420]"
    >
      <motion.img
        src="/images/hero/hero-facade.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={reduceMotion ? undefined : { y: imageY }}
        className="absolute inset-x-0 -top-[15%] -z-10 h-[130%] w-full object-cover opacity-40"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#060C14]/55" />

      <div className="container relative py-24 text-center md:py-32 lg:py-40">
        <Reveal as="p" className="eyebrow !text-white/55">
          {hotelConfig.tagline}
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="cta-heading"
            className="mx-auto mt-6 max-w-3xl font-display text-[2.5rem] leading-[1.05] text-white text-balance sm:text-[3.25rem] lg:text-[4rem]"
          >
            Your room in Talegaon is a message away.
          </h2>
        </Reveal>

        <Reveal as="p" delay={0.14} className="mx-auto mt-7 max-w-measure-sm font-sans text-[1.0625rem] leading-relaxed text-white/70">
          Send us your dates and we will come back with availability and the current tariff.
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button type="button" onClick={() => openBooking()} className="btn btn-on-image-solid w-full sm:w-auto">
              Book Your Stay
              <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => openWhatsApp(generalInquiryMessage())}
              className="btn btn-on-image w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Chat on WhatsApp
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-10 font-sans text-[0.9375rem] text-white/60">
            Or call{' '}
            <a href={telUrl(hotelConfig.phone.primaryDial)} className="text-white link-underline">
              {hotelConfig.phone.primary}
            </a>
            <Phone className="ml-2 inline h-3.5 w-3.5 align-[-0.1em] text-gold" strokeWidth={1.6} aria-hidden="true" />
          </p>
        </Reveal>
      </div>
    </section>
  )
}
