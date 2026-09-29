import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import Reveal from './Reveal'
import { amenities, featuredAmenities } from '../data/amenities'

const amenityPhotos = [
  {
    src: '/images/optimized/gallery/Main/frontview.webp',
    alt: 'Front view of Ojas Inn',
    label: 'Main',
  },
  {
    src: '/images/optimized/gallery/Main/main-1.webp',
    alt: 'Ojas Inn exterior',
    label: 'Main',
  },
  {
    src: '/images/optimized/gallery/Main/main-2.webp',
    alt: 'Ojas Inn exterior view',
    label: 'Main',
  },
  {
    src: '/images/optimized/gallery/Reception/reception-1.webp',
    alt: 'Ojas Inn reception',
    label: 'Reception',
  },
  {
    src: '/images/optimized/gallery/Reception/reception-2.webp',
    alt: 'Ojas Inn reception area',
    label: 'Reception',
  },
  {
    src: '/images/optimized/gallery/Reception/reception-3.webp',
    alt: 'Ojas Inn reception',
    label: 'Reception',
  },
  {
    src: '/images/gallery/Lobby-corridor/1.webp',
    alt: 'Ojas Inn lobby corridor',
    label: 'Lobby',
  },
  {
    src: '/images/optimized/gallery/Lobby-corridor/2.webp',
    alt: 'Ojas Inn corridor',
    label: 'Lobby',
  },
  {
    src: '/images/gallery/Lobby-corridor/3.webp',
    alt: 'Ojas Inn corridor',
    label: 'Lobby',
  },
  {
    src: '/images/optimized/gallery/Balcony/1.webp',
    alt: 'Ojas Inn balcony',
    label: 'Balcony',
  },
  {
    src: '/images/optimized/gallery/Balcony/2.webp',
    alt: 'Ojas Inn balcony',
    label: 'Balcony',
  },
  {
    src: '/images/optimized/gallery/Balcony/3.webp',
    alt: 'Ojas Inn balcony',
    label: 'Balcony',
  },
  {
    src: '/images/optimized/gallery/room/Deluxe AC/1.webp',
    alt: 'Deluxe AC room',
    label: 'Deluxe AC',
  },
  {
    src: '/images/optimized/gallery/room/Deluxe AC/2.webp',
    alt: 'Deluxe AC room',
    label: 'Deluxe AC',
  },
  {
    src: '/images/optimized/gallery/room/Deluxe AC/6.webp',
    alt: 'Deluxe AC room',
    label: 'Deluxe AC',
  },
  {
    src: '/images/optimized/gallery/room/Deluxe Non AC/1.webp',
    alt: 'Deluxe Non AC room',
    label: 'Deluxe Non AC',
  },
  {
    src: '/images/optimized/gallery/room/Deluxe Non AC/2.webp',
    alt: 'Deluxe Non AC room',
    label: 'Deluxe Non AC',
  },
  {
    src: '/images/optimized/gallery/room/Deluxe Non AC/3.webp',
    alt: 'Deluxe Non AC room',
    label: 'Deluxe Non AC',
  },
  {
    src: '/images/optimized/gallery/room/Executive/IMG20260812164110.webp',
    alt: 'Executive room',
    label: 'Executive',
  },
  {
    src: '/images/optimized/gallery/room/Executive/IMG20260812165425.webp',
    alt: 'Executive room',
    label: 'Executive',
  },
  {
    src: '/images/optimized/gallery/room/Executive/IMG20260812165507.webp',
    alt: 'Executive room',
    label: 'Executive',
  },
  {
    src: '/images/optimized/gallery/room/Family/1.webp',
    alt: 'Family room',
    label: 'Family',
  },
  {
    src: '/images/optimized/gallery/room/Family/2.webp',
    alt: 'Family room',
    label: 'Family',
  },
  {
    src: '/images/optimized/gallery/room/Family/3.webp',
    alt: 'Family room',
    label: 'Family',
  }]

const secondaryOrder = [
  'security',
  'tv',
  'dth',
  'toiletries',
  'towels',
  'linen',
  'water',
  'wake-up']

const secondary = secondaryOrder
  .map((id) => amenities.find((amenity) => amenity.id === id))
  .filter(Boolean)

const featuredCopy = {
  wifi: 'Stay connected throughout your stay.',
  ac: 'Comfortable room temperatures, day and night.',
  parking: 'Convenient on-site parking for guests.',
  'front-desk': 'Assistance available whenever you arrive.',
  'power-backup': 'Essential services supported during power interruptions.',
  housekeeping: 'Rooms refreshed throughout your stay.',
}

function FeaturedAmenity({ amenity }) {
  const Icon = amenity.icon

  return (
    <div className="group flex h-full flex-col text-center">
      <div
        className="mx-auto grid h-[78px] w-[78px] shrink-0 place-items-center
                   rounded-full border border-gold/15 bg-[#EDE3D2]
                   text-gold transition-all duration-500 ease-ease
                   group-hover:-translate-y-1 group-hover:border-gold/35
                   group-hover:bg-gold/10"
      >
        <Icon
          className="h-7 w-7"
          strokeWidth={1.35}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 flex min-h-[58px] items-start justify-center">
        <h3
          className="max-w-[190px] font-display text-[1.16rem]
                     leading-[1.18] text-ink transition-colors duration-300
                     group-hover:text-gold"
        >
          {amenity.name}
        </h3>
      </div>

      <div className="mt-1 flex min-h-[54px] items-start justify-center">
        <p
          className="max-w-[185px] font-sans text-[0.8rem]
                     leading-[1.55] text-muted"
        >
          {featuredCopy[amenity.id] ?? amenity.note}
        </p>
      </div>
    </div>
  )
}

function SecondaryAmenity({ amenity, first }) {
  const Icon = amenity.icon

  return (
    <div
      className={`
        group flex min-w-0 flex-1 items-center justify-center
        gap-3 px-3 py-5 text-center
        ${first ? '' : 'border-l border-gold/20'}
      `}
    >
      <Icon
        className="h-[18px] w-[18px] shrink-0 text-gold/90
                   transition-transform duration-300
                   group-hover:-translate-y-0.5"
        strokeWidth={1.4}
        aria-hidden="true"
      />

      <span
        className="font-display text-[0.9rem] leading-[1.2]
                   text-ink transition-colors duration-300
                   group-hover:text-gold"
      >
        {amenity.name}
      </span>
    </div>
  )
}

function MobileSecondaryAmenity({ amenity }) {
  const Icon = amenity.icon

  return (
    <div
      className="group flex min-h-[64px] min-w-0 items-center gap-3 rounded-xl
                 border border-gold/15 bg-[#F8F3EA] px-4 py-3
                 transition-all duration-300
                 hover:border-gold/30 hover:bg-white
                 dark:border-white/10 dark:bg-[#2A3A48]
                 dark:hover:border-gold/30 dark:hover:bg-[#334A5A]"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full
                   bg-gold/10 text-gold"
      >
        <Icon
          className="h-[17px] w-[17px]"
          strokeWidth={1.4}
          aria-hidden="true"
        />
      </span>

      <span
        className="min-w-0 break-words font-display text-[0.88rem] leading-[1.2]
                   text-ink transition-colors duration-300
                   group-hover:text-gold dark:text-[#F6F3ED]"
      >
        {amenity.name}
      </span>
    </div>
  )
}

export default function AmenitiesSection() {
  const reduceMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)

  const groups = [0, 1]

  return (
    <section
      id="amenities"
      aria-labelledby="amenities-heading"
      className="overflow-hidden bg-[#F3EBDD] py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div
        className="mx-auto w-full max-w-[1600px]
                   px-5 sm:px-7 lg:px-10 xl:px-12"
      >

        {/* HEADER */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal
              as="p"
              className="font-sans text-[0.68rem] font-semibold
                         uppercase tracking-[0.34em] text-gold"
            >
              Amenities
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="amenities-heading"
                className="mt-4 max-w-[780px] font-display
                           text-[clamp(2.8rem,5.5vw,5.5rem)]
                           leading-[1.02] tracking-[-0.045em] text-ink"
              >
                Thoughtful comfort,
                <span className="mt-1 block text-gold">
                  considered in every detail.
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal
            as="p"
            delay={0.12}
            className="max-w-[540px] border-l border-gold/35
                       pl-5 font-sans text-[0.94rem] leading-[1.75]
                       text-muted sm:pl-7 lg:col-span-5 lg:col-start-8 lg:mb-1"
          >
            Designed around the essentials of a comfortable stay, with
            practical conveniences and attentive services available
            throughout Ojas Inn.
          </Reveal>
        </div>

        {/* PHOTO STRIP */}
        <Reveal delay={0.18} y={24}>
          <div
            className="relative mt-10 sm:mt-14"
            onMouseLeave={() => {
              if (!reduceMotion) setPaused(false)
            }}
          >
            <div className="overflow-visible py-3">
              <div
                className={`ojas-amenities-marquee ${
                  paused ? 'ojas-amenities-paused' : ''
                }`}
              >
                {groups.map((group) => (
                  <div
                    key={group}
                    className="ojas-amenities-group"
                    aria-hidden={group === 1}
                  >
                    {amenityPhotos.map((photo) => (
                      <motion.figure
                        key={`${group}-${photo.src}`}
                        onMouseEnter={() => {
                          if (!reduceMotion) setPaused(true)
                        }}
                        onMouseLeave={() => {
                          if (!reduceMotion) setPaused(false)
                        }}
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                scale: 1.07,
                                zIndex: 30,
                              }
                        }
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="ojas-amenities-photo group relative"
                      >
                        <div
                          className="relative h-full w-full overflow-hidden
                                     rounded-[12px] border-2 border-transparent
                                     bg-[#E7DECF]
                                     shadow-[0_8px_28px_rgba(11,20,32,0.07)]
                                     transition-[border-color,box-shadow]
                                     duration-400 ease-ease
                                     group-hover:border-gold/75
                                     group-hover:shadow-[0_18px_45px_rgba(11,20,32,0.15)]"
                        >
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            loading="lazy"
                            decoding="async"
                            width="1000"
                            height="667"
                            className="h-full w-full object-cover
                                       transition-transform duration-700 ease-ease
                                       group-hover:scale-[1.035]"
                          />

                          <div
                            className="pointer-events-none absolute inset-0
                                       bg-gradient-to-t from-black/55
                                       via-black/5 to-transparent"
                          />

                          <div
                            className="pointer-events-none absolute inset-x-0
                                       bottom-0 p-5 sm:p-6"
                          >
                            <p
                              className="font-sans text-[0.68rem] font-semibold
                                         uppercase tracking-[0.24em] text-white"
                            >
                              {photo.label}
                            </p>
                          </div>
                        </div>
                      </motion.figure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* DIVIDER */}
        <Reveal delay={0.12}>
          <div className="mt-6 flex w-full items-center gap-4 sm:mt-8 sm:gap-5">
            <span className="h-px flex-1 bg-gold/30" />

            <span
              className="whitespace-nowrap font-sans text-[0.6rem]
                         font-semibold uppercase tracking-[0.22em]
                         text-gold/90 sm:text-[0.66rem] sm:tracking-[0.28em]"
            >
              A calmer stay, in every detail
            </span>

            <span className="h-px flex-1 bg-gold/30" />
          </div>
        </Reveal>

        {/* PRIMARY AMENITIES */}
        <Reveal delay={0.18}>
          <div
            className="mt-10 grid grid-cols-2 items-start gap-x-5
                       gap-y-10 sm:mt-12 sm:grid-cols-2 sm:gap-y-12
                       md:grid-cols-3 lg:mt-14 lg:grid-cols-6
                       lg:gap-x-6 xl:gap-x-9"
          >
            {featuredAmenities.map((amenity) => (
              <FeaturedAmenity
                key={amenity.id}
                amenity={amenity}
              />
            ))}
          </div>
        </Reveal>

        {/* SECONDARY AMENITIES */}
        <Reveal delay={0.24}>
          <div className="mt-14 sm:mt-20">

            <div className="flex items-center gap-4 sm:gap-5">
              <span
                className="shrink-0 font-sans text-[0.6rem]
                           font-semibold uppercase tracking-[0.22em]
                           text-gold sm:text-[0.66rem] sm:tracking-[0.28em]"
              >
                Further conveniences
              </span>

              <span className="h-px flex-1 bg-gold/30" />
            </div>

            {/* Desktop */}
            <div
              className="mt-5 hidden w-full overflow-hidden
                         border-y border-gold/25 lg:flex"
            >
              {secondary.map((amenity, index) => (
                <SecondaryAmenity
                  key={amenity.id}
                  amenity={amenity}
                  first={index === 0}
                />
              ))}
            </div>

            {/* Mobile / Tablet */}
            <div
              className="mt-5 grid grid-cols-2 gap-2.5
                         sm:grid-cols-2 sm:gap-3 lg:hidden"
            >
              {secondary.map((amenity) => (
                <MobileSecondaryAmenity
                  key={amenity.id}
                  amenity={amenity}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .ojas-amenities-marquee {
          display: flex;
          width: max-content;
          animation: ojasAmenitiesLeftToRight 120s linear infinite;
          animation-play-state: running;
          will-change: transform;
        }

        .ojas-amenities-marquee.ojas-amenities-paused {
          animation-play-state: paused;
        }

        .ojas-amenities-group {
          display: flex;
          align-items: center;
          gap: 22px;
          padding-right: 22px;
          flex-shrink: 0;
        }

        .ojas-amenities-photo {
          width: clamp(360px, 27vw, 480px);
          height: clamp(270px, 20.25vw, 360px);
          flex-shrink: 0;
          transform-origin: center center;
        }

        @keyframes ojasAmenitiesLeftToRight {
          from {
            transform: translate3d(-50%, 0, 0);
          }

          to {
            transform: translate3d(0%, 0, 0);
          }
        }

        @media (max-width: 1023px) {
          .ojas-amenities-group {
            gap: 16px;
            padding-right: 16px;
          }

          .ojas-amenities-photo {
            width: 58vw;
            height: 43.5vw;
            max-height: 380px;
          }
        }

        @media (max-width: 639px) {
          .ojas-amenities-marquee {
            animation-duration: 120s;
          }

          .ojas-amenities-group {
            gap: 12px;
            padding-right: 12px;
          }

          .ojas-amenities-photo {
            width: 78vw;
            height: 58.5vw;
            max-height: 340px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ojas-amenities-marquee {
            animation: none !important;
            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}</style>
    </section>
  )
}
