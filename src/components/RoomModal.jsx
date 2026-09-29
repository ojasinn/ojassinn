import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Users,
  X,
} from 'lucide-react'

import { hotelConfig } from '../config/hotelConfig'
import { useBooking } from '../hooks/useBooking'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useMediaQuery } from '../hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1]

export default function RoomModal() {
  const { activeRoom, closeRoom, openBooking } = useBooking()
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const isCompact = useMediaQuery('(max-width: 639px)')
  const [shot, setShot] = useState(0)

  const open = activeRoom !== null

  const lastRoom = useRef(null)
  if (activeRoom) lastRoom.current = activeRoom
  const room = activeRoom ?? lastRoom.current

  useFocusTrap(panelRef, open, closeRoom)

  useEffect(() => {
    if (open) setShot(0)
  }, [open, activeRoom?.id])

  // Prevent the page underneath the modal from scrolling on mobile/desktop.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const media = room?.media?.length
    ? room.media
    : (room?.images || []).map((src) => ({
        type: 'image',
        src,
      }))

  const currentMedia = media[shot]

  const showPrevious = () => {
    if (!media.length) return
    setShot((current) => (current - 1 + media.length) % media.length)
  }

  const showNext = () => {
    if (!media.length) return
    setShot((current) => (current + 1) % media.length)
  }

  // Desktop keyboard navigation.
  useEffect(() => {
    if (!open || !media.length) return

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, media.length])

  const panelMotion = reduceMotion
    ? { initial: false, animate: {}, exit: {} }
    : isCompact
      ? {
          initial: { y: '100%' },
          animate: { y: '0%' },
          exit: { y: '100%' },
          transition: { duration: 0.45, ease: EASE },
        }
      : {
          initial: { opacity: 0, y: 26, scale: 0.985 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 18, scale: 0.99 },
          transition: { duration: 0.45, ease: EASE },
        }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          {/* BACKDROP */}
          <motion.button
            type="button"
            aria-label="Close room details"
            onClick={closeRoom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 cursor-default bg-[#060C14]/70 backdrop-blur-[3px]"
            tabIndex={-1}
          />

          {/* MODAL */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-modal-title"
            tabIndex={-1}
            {...panelMotion}
            className="
              relative flex w-full flex-col overflow-hidden bg-surface
              h-[100svh]
              sm:h-auto sm:max-h-[88vh] sm:max-w-5xl
              sm:rounded-xs sm:surface-float
            "
          >
            {/* =========================================================
                MOBILE MEDIA VIEWER
                ========================================================= */}
            <div className="flex min-h-0 flex-1 flex-col sm:hidden">
              {/* Mobile header */}
              <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-line bg-surface/95 px-4 py-3 backdrop-blur-md">
                <div className="min-w-0 pr-3">
                  <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-wider2 text-muted">
                    {hotelConfig.hotelName}
                  </p>

                  <h2
                    id="room-modal-title"
                    className="mt-0.5 truncate font-display text-[1.15rem] leading-tight text-ink"
                  >
                    {room.name}
                  </h2>
                </div>

                <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 font-sans text-[0.6rem] font-semibold text-white">
                  {shot + 1} / {media.length}
                </span>
              </div>

              {/* MAIN MOBILE MEDIA */}
              <div className="relative min-h-0 flex-1 overflow-hidden bg-[#090d12]">
                <AnimatePresence mode="wait" initial={false}>
                  {currentMedia?.type === 'video' ? (
                    <motion.video
                      key={currentMedia.src}
                      src={currentMedia.src}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="
                        absolute inset-0
                        h-full w-full
                        object-contain
                      "
                    />
                  ) : (
                    <motion.img
                      key={currentMedia?.src}
                      src={currentMedia?.src}
                      alt={`${room.name} at ${hotelConfig.hotelName} — view ${shot + 1}`}
                      decoding="async"
                      fetchPriority="high"
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="
                        absolute inset-0
                        h-full w-full
                        object-contain
                      "
                    />
                  )}
                </AnimatePresence>

                {/* Media number */}
                <span
                  className="
                    pointer-events-none absolute left-3 top-3 z-10
                    rounded-full bg-[#060C14]/70
                    px-2.5 py-1.5
                    font-sans text-[0.58rem] font-semibold
                    text-white backdrop-blur-md
                  "
                >
                  {shot + 1} / {media.length}
                </span>

                {/* Mobile previous */}
                {media.length > 1 && (
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous media"
                    className="
                      absolute left-2 top-1/2 z-20
                      grid h-11 w-11 -translate-y-1/2
                      place-items-center rounded-full
                      bg-black/55 text-white
                      shadow-lg backdrop-blur-md
                      transition active:scale-95
                    "
                  >
                    <ChevronLeft className="h-6 w-6" strokeWidth={1.8} />
                  </button>
                )}

                {/* Mobile next */}
                {media.length > 1 && (
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next media"
                    className="
                      absolute right-2 top-1/2 z-20
                      grid h-11 w-11 -translate-y-1/2
                      place-items-center rounded-full
                      bg-black/55 text-white
                      shadow-lg backdrop-blur-md
                      transition active:scale-95
                    "
                  >
                    <ChevronRight className="h-6 w-6" strokeWidth={1.8} />
                  </button>
                )}
              </div>

              {/* MOBILE THUMBNAILS */}
              {media.length > 1 && (
                <div
                  className="
                    shrink-0 border-t border-line bg-surface
                    px-3 py-3
                  "
                >
                  <div className="no-scrollbar flex gap-2 overflow-x-auto">
                    {media.map((item, index) => (
                      <button
                        key={`${item.src}-${index}`}
                        type="button"
                        onClick={() => setShot(index)}
                        aria-label={
                          item.type === 'video'
                            ? `View video ${index + 1} of ${room.name}`
                            : `View photo ${index + 1} of ${room.name}`
                        }
                        aria-current={index === shot ? 'true' : undefined}
                        className={`
                          relative h-14 w-[4.5rem]
                          shrink-0 overflow-hidden rounded-lg
                          border-2 bg-alt
                          transition-all duration-200
                          ${
                            index === shot
                              ? 'border-gold opacity-100'
                              : 'border-transparent opacity-60'
                          }
                        `}
                      >
                        {item.type === 'video' ? (
                          <>
                            <video
                              src={item.src}
                              muted
                              playsInline
                              preload="metadata"
                              className="h-full w-full object-cover"
                            />

                            <span className="absolute inset-0 grid place-items-center bg-black/20">
                              <span className="grid h-7 w-7 place-items-center rounded-full bg-black/70 text-white">
                                <span className="ml-0.5 text-[10px]">
                                  ▶
                                </span>
                              </span>
                            </span>
                          </>
                        ) : (
                          <img
                            src={item.src}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        )}

                        <span
                          className="
                            absolute bottom-1 left-1
                            rounded bg-black/65
                            px-1.5 py-0.5
                            font-sans text-[8px]
                            font-semibold text-white
                          "
                        >
                          {index + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* =========================================================
                DESKTOP / LAPTOP VIEW
                Existing layout preserved
                ========================================================= */}
            <div className="hidden min-h-0 flex-1 overflow-hidden sm:grid sm:grid-cols-2">
              {/* Photography / Media */}
              <div className="relative flex min-h-0 flex-col bg-alt sm:overflow-hidden">
                <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
                  <AnimatePresence mode="wait" initial={false}>
                    {currentMedia?.type === 'video' ? (
                      <motion.video
                        key={currentMedia.src}
                        src={currentMedia.src}
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    ) : (
                      <motion.img
                        key={currentMedia?.src}
                        src={currentMedia?.src}
                        alt={`${room.name} at ${hotelConfig.hotelName} — view ${shot + 1}`}
                        width="1000"
                        height="667"
                        decoding="async"
                        initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    )}
                  </AnimatePresence>

                  {media.length > 0 && (
                    <span
                      className="
                        absolute left-3 top-3 z-10
                        rounded-full bg-[#060C14]/65
                        px-3 py-1.5
                        font-sans text-[0.6rem]
                        font-semibold uppercase tracking-wider2
                        text-white backdrop-blur-md
                      "
                    >
                      {shot + 1} / {media.length}
                    </span>
                  )}

                  {/* Desktop previous */}
                  {media.length > 1 && (
                    <button
                      type="button"
                      onClick={showPrevious}
                      aria-label="Previous media"
                      className="
                        absolute left-3 top-1/2 z-20
                        grid h-11 w-11 -translate-y-1/2
                        place-items-center rounded-full
                        bg-[#060C14]/60 text-white
                        shadow-lg backdrop-blur-md
                        transition-all duration-200
                        hover:bg-[#060C14]/85
                        hover:scale-105
                      "
                    >
                      <ChevronLeft className="h-6 w-6" strokeWidth={1.7} />
                    </button>
                  )}

                  {/* Desktop next */}
                  {media.length > 1 && (
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next media"
                      className="
                        absolute right-3 top-1/2 z-20
                        grid h-11 w-11 -translate-y-1/2
                        place-items-center rounded-full
                        bg-[#060C14]/60 text-white
                        shadow-lg backdrop-blur-md
                        transition-all duration-200
                        hover:bg-[#060C14]/85
                        hover:scale-105
                      "
                    >
                      <ChevronRight className="h-6 w-6" strokeWidth={1.7} />
                    </button>
                  )}
                </div>

                {media.length > 1 && (
                  <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto p-3 sm:p-4">
                    {media.map((item, index) => (
                      <button
                        key={`${item.src}-${index}`}
                        type="button"
                        onClick={() => setShot(index)}
                        aria-label={
                          item.type === 'video'
                            ? `Play video ${index + 1} of ${room.name}`
                            : `Show photo ${index + 1} of ${room.name}`
                        }
                        aria-current={index === shot ? 'true' : undefined}
                        className={`
                          relative h-14 w-20 shrink-0 overflow-hidden rounded-xs
                          border transition-all duration-300
                          sm:h-16 sm:w-24
                          ${
                            index === shot
                              ? 'border-gold opacity-100'
                              : 'border-transparent opacity-55 hover:opacity-90'
                          }
                        `}
                      >
                        {item.type === 'video' ? (
                          <>
                            <video
                              src={item.src}
                              muted
                              playsInline
                              preload="metadata"
                              className="h-full w-full object-cover"
                            />

                            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                              <span className="grid h-7 w-7 place-items-center rounded-full bg-black/65 text-white">
                                <span className="ml-0.5 text-[10px]">
                                  ▶
                                </span>
                              </span>
                            </span>
                          </>
                        ) : (
                          <img
                            src={item.src}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        )}

                        <span
                          className="
                            pointer-events-none absolute bottom-1 left-1
                            rounded bg-black/60 px-1.5 py-0.5
                            font-sans text-[8px] font-semibold text-white
                          "
                        >
                          {index + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Detail */}
              <div className="flex min-h-0 flex-col overflow-y-auto p-6 sm:p-9 lg:p-11">
                <p className="eyebrow">{hotelConfig.hotelName}</p>

                <h2
                  className="mt-4 font-display text-[2rem] leading-tight text-ink lg:text-[2.4rem]"
                >
                  {room.name}
                </h2>

                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
                  <div className="bg-surface px-4 py-4">
                    <dt className="flex items-center gap-2 font-sans text-2xs uppercase tracking-wider2 text-muted">
                      <Maximize2
                        className="h-3.5 w-3.5 text-gold"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      Room size
                    </dt>
                    <dd className="mt-2 font-display text-lg text-ink">
                      {room.size}
                    </dd>
                  </div>

                  <div className="bg-surface px-4 py-4">
                    <dt className="flex items-center gap-2 font-sans text-2xs uppercase tracking-wider2 text-muted">
                      <Users
                        className="h-3.5 w-3.5 text-gold"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      Capacity
                    </dt>
                    <dd className="mt-2 font-display text-lg text-ink">
                      {room.occupancy}
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 font-sans text-[0.9375rem] leading-relaxed text-muted">
                  {room.summary}
                </p>

                <h3 className="mt-8 font-sans text-2xs uppercase tracking-wider2 text-muted">
                  In this room
                </h3>

                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {room.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 font-sans text-[0.875rem] text-ink"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => openBooking(room.name)}
                    className="btn btn-primary w-full"
                  >
                    Book This Room
                    <ArrowRight
                      className="btn-arrow h-4 w-4"
                      strokeWidth={1.75}
                    />
                  </button>

                  <p className="mt-3 text-center font-sans text-2xs leading-relaxed text-muted">
                    {hotelConfig.pricing.note}
                  </p>
                </div>
              </div>
            </div>

            {/* CLOSE */}
            <button
              type="button"
              onClick={closeRoom}
              aria-label="Close room details"
              className="
                absolute right-3 top-3 z-30
                grid h-10 w-10 place-items-center
                rounded-full bg-[#060C14]/65 text-white
                backdrop-blur-md
                transition-colors duration-300
                hover:bg-[#060C14]/85
                sm:right-4 sm:top-4
              "
            >
              <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
