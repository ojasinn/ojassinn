import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Maximize2, Users, Tag } from 'lucide-react'

import { useBooking } from '../hooks/useBooking'
import { hotelConfig } from '../config/hotelConfig'

export default function RoomCard({ room, index }) {
  const { openRoom, openBooking } = useBooking()
  const reduceMotion = useReducedMotion()

  const showPrice =
    hotelConfig.pricing.showPrices &&
    Number.isFinite(room.originalPrice) &&
    Number.isFinite(room.price)

  const discountPercent = room.discountPercent ?? 10

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(price)

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-[1rem] border border-line/80
        bg-surface
        shadow-[0_4px_16px_rgba(14,27,44,0.05)]
        transition-all duration-500
        hover:-translate-y-1
        hover:border-gold/45
        hover:shadow-[0_10px_24px_rgba(14,27,44,0.09)]
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0 z-20 h-[2px]
          origin-left scale-x-0 bg-gold
          transition-transform duration-700
          group-hover:scale-x-100
        "
      />

      {/* IMAGE */}
      <div className="relative aspect-[16/6.5] shrink-0 overflow-hidden bg-alt">
        <img
          src={room.image}
          alt={room.alt}
          loading="lazy"
          decoding="async"
          width="1000"
          height="667"
          className="
            h-full w-full object-cover
            transition-transform duration-[900ms]
            group-hover:scale-[1.035]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t from-[#060C14]/50 via-transparent to-transparent
            opacity-0 transition-opacity duration-500
            group-hover:opacity-100
          "
        />

        <span
          className="
            absolute left-3 top-3 rounded-full
            border border-white/25
            bg-[#060C14]/55 px-2.5 py-1
            font-sans text-[0.52rem] font-semibold
            uppercase tracking-mega text-white
            backdrop-blur-md
          "
        >
          Room {String(index + 1).padStart(2, '0')}
        </span>

        {showPrice && (
          <span
            className="
              absolute right-3 top-3
              inline-flex items-center gap-1
              rounded-full
              border border-white/20
              bg-[#060C14]/75
              px-2.5 py-1
              font-sans text-[0.52rem] font-bold
              uppercase tracking-wider2 text-white
              shadow-sm backdrop-blur-md
            "
          >
            <Tag className="h-2.5 w-2.5 text-gold" strokeWidth={2} />
            {discountPercent}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={() => openRoom(room)}
          className="
            absolute bottom-3 right-3
            inline-flex items-center gap-1.5
            rounded-full border border-white/30
            bg-white/95 px-2.5 py-1
            font-sans text-[0.52rem] font-semibold
            uppercase tracking-wider2 text-[#0E1B2C]
            opacity-0 translate-y-2
            backdrop-blur-md
            transition-all duration-300
            group-hover:translate-y-0 group-hover:opacity-100
            hover:bg-white
          "
        >
          View room
          <ArrowRight className="h-2.5 w-2.5" strokeWidth={1.8} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-4 pb-3 pt-3">

        {/* TITLE */}
        <div className="flex h-[30px] items-start">
          <h3 className="font-display text-[1.25rem] leading-[1.05] tracking-[-0.01em] text-ink">
            {room.name}
          </h3>
        </div>

        {/* META */}
        <div className="mt-2 grid h-[32px] grid-cols-[1fr_1.15fr_0.9fr] items-center gap-2 border-y border-line/70">

          <div className="flex min-w-0 items-center gap-1">
            <Maximize2
              className="h-2.5 w-2.5 shrink-0 text-gold"
              strokeWidth={1.5}
            />
            <span className="truncate font-sans text-[0.6rem] text-muted">
              {room.size}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-1">
            <Users
              className="h-2.5 w-2.5 shrink-0 text-gold"
              strokeWidth={1.5}
            />
            <span className="truncate font-sans text-[0.6rem] text-muted">
              {room.occupancy}
            </span>
          </div>

          <div className="min-w-0">
            {room.bed && (
              <span className="block truncate font-sans text-[0.6rem] text-muted">
                {room.bed}
              </span>
            )}
          </div>

        </div>

        {/* PRICE */}
        {showPrice && (
          <div
            className="
              relative mt-3 overflow-hidden
              rounded-[0.85rem]
              border border-gold/20
              bg-gradient-to-br from-gold/[0.09] via-gold/[0.035] to-transparent
              px-3 py-2.5
              shadow-[0_3px_12px_rgba(14,27,44,0.035)]
            "
          >
            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="
                      font-sans text-[0.48rem] font-semibold
                      uppercase tracking-[0.16em] text-muted
                    "
                  >
                    Special rate
                  </span>

                  <span
                    className="
                      inline-flex items-center
                      rounded-full
                      bg-gold/15
                      px-1.5 py-0.5
                      font-sans text-[0.46rem] font-bold
                      uppercase tracking-wider2 text-ink
                    "
                  >
                    {discountPercent}% OFF
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-2">
                  <span
                    className="
                      font-sans text-[0.7rem] font-medium
                      text-muted line-through
                      decoration-muted/60
                    "
                  >
                    {hotelConfig.pricing.currency}
                    {formatPrice(room.originalPrice)}
                  </span>

                  <span
                    className="
                      font-display text-[1.45rem]
                      font-semibold leading-none
                      tracking-[-0.025em] text-ink
                    "
                  >
                    {hotelConfig.pricing.currency}
                    {formatPrice(room.price)}
                  </span>

                  <span
                    className="
                      font-sans text-[0.52rem]
                      font-medium text-muted
                    "
                  >
                    / night
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="
                  hidden shrink-0 place-items-center
                  sm:grid
                  h-8 w-8
                  rounded-full
                  border border-gold/20
                  bg-white/60
                "
              >
                <Tag
                  className="h-3.5 w-3.5 text-gold"
                  strokeWidth={1.7}
                />
              </div>

            </div>

            <div className="mt-2 border-t border-gold/15 pt-1.5">
              <p className="font-sans text-[0.49rem] leading-relaxed text-muted">
                {room.extraPersonNote}
              </p>
            </div>
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="mt-2 h-[43px] overflow-hidden">
          <p className="font-sans text-[0.68rem] leading-[1.45] text-muted">
            {room.summary}
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-2 h-[48px] overflow-hidden border-t border-line/70 pt-2">
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            {room.features.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="
                  flex min-w-0 items-start gap-1
                  font-sans text-[0.58rem] leading-snug text-muted
                "
              >
                <span
                  className="
                    mt-[-1px] grid h-[13px] w-[13px]
                    shrink-0 place-items-center rounded-full
                    bg-gold/10
                  "
                >
                  <Check
                    className="h-2 w-2 text-gold"
                    strokeWidth={2}
                  />
                </span>

                <span className="truncate">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line/70 pt-2">

          <button
            type="button"
            onClick={() => openRoom(room)}
            className="
              inline-flex h-[34px] w-[108px]
              shrink-0 items-center justify-center gap-1
              rounded-full
              border border-line
              bg-bg
              font-sans text-[0.52rem] font-semibold
              uppercase tracking-wider2 text-ink
              transition-all duration-300
              hover:border-gold/60
              hover:bg-gold/10
              hover:text-gold
            "
          >
            View details
            <ArrowRight
              className="h-2.5 w-2.5"
              strokeWidth={1.7}
            />
          </button>

          <button
            type="button"
            onClick={() => openBooking(room.name)}
            className="
              inline-flex h-[34px] w-[108px]
              shrink-0 items-center justify-center gap-1
              rounded-full
              bg-ink
              font-sans text-[0.52rem] font-semibold
              uppercase tracking-wider2 text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-gold
            "
          >
            Book room
            <ArrowRight
              className="h-2.5 w-2.5"
              strokeWidth={1.7}
            />
          </button>

        </div>
      </div>
    </motion.article>
  )
}
