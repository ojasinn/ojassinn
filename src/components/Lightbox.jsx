import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { useFocusTrap } from '../hooks/useFocusTrap'
import { useScrollLock } from '../hooks/useScrollLock'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Full-screen photo viewer.
 *
 * `index` is `null` when closed. Navigation is reported upward so the gallery
 * stays the single owner of which photo is showing.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const open = index !== null && items.length > 0
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [direction, setDirection] = useState(1)

  useFocusTrap(panelRef, open, onClose)
  useScrollLock(open)

  // Hold the last photo so the closing animation still has something to paint.
  const lastIndex = useRef(0)
  if (open) lastIndex.current = index
  const current = open ? index : lastIndex.current
  const item = items[current] ?? items[0]

  const go = useCallback(
    (step) => {
      if (items.length === 0) return
      setDirection(step)
      onNavigate((current + step + items.length) % items.length)
    },
    [current, items.length, onNavigate],
  )

  // Arrow keys. Escape is already handled by the focus trap.
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, go])

  // Warm the neighbours so stepping through feels instant.
  useEffect(() => {
    if (!open || items.length < 2) return
    const neighbours = [(current + 1) % items.length, (current - 1 + items.length) % items.length]
    neighbours.forEach((position) => {
      const preload = new Image()
      preload.src = items[position].src
    })
  }, [open, current, items])

  const slide = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: direction * 48 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -48 },
        transition: { duration: 0.45, ease: EASE },
      }

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[90] bg-[#05090F]/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${current + 1} of ${items.length}`}
            tabIndex={-1}
            className="relative flex h-full w-full flex-col"
          >
            {/* Top bar */}
            <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
              <p className="font-sans text-2xs uppercase tracking-mega text-white/60">
                {String(current + 1).padStart(2, '0')}
                <span className="mx-2 text-white/25">/</span>
                {String(items.length).padStart(2, '0')}
              </p>

              <button
                type="button"
                onClick={onClose}
                data-autofocus
                aria-label="Close gallery viewer"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20
                           text-white transition-colors duration-300 hover:border-white/60
                           hover:bg-white/10"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </button>
            </div>

            {/* Stage */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  decoding="async"
                  drag={reduceMotion ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragEnd={(event, info) => {
                    if (info.offset.x < -70) go(1)
                    else if (info.offset.x > 70) go(-1)
                  }}
                  {...slide}
                  className="max-h-full max-w-full cursor-grab object-contain shadow-2xl active:cursor-grabbing"
                />
              </AnimatePresence>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center
                               rounded-full border border-white/20 bg-[#05090F]/55 text-white
                               backdrop-blur-md transition-colors duration-300 hover:border-white/60
                               hover:bg-white/10 sm:left-5"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center
                               rounded-full border border-white/20 bg-[#05090F]/55 text-white
                               backdrop-blur-md transition-colors duration-300 hover:border-white/60
                               hover:bg-white/10 sm:right-5"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="shrink-0 px-5 pb-6 pt-5 text-center sm:px-8 sm:pb-8">
              <p
                aria-live="polite"
                className="mx-auto max-w-measure font-sans text-[0.875rem] leading-relaxed text-white/70"
              >
                {item.alt}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
