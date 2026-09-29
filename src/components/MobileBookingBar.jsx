import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'

import { hotelConfig } from '../config/hotelConfig'
import { useBooking } from '../hooks/useBooking'
import { telUrl } from '../utils/whatsapp'

const EASE = [0.22, 1, 0.36, 1]

/** Sticky enquiry bar for phones. Hidden while an overlay owns the screen. */
export default function MobileBookingBar() {
  const { openBooking, bookingOpen, activeRoom } = useBooking()
  const [past, setPast] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visible = past && !bookingOpen && activeRoom === null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? false : { y: '110%' }}
          animate={{ y: '0%' }}
          exit={reduceMotion ? { opacity: 0 } : { y: '110%' }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95
                     px-4 pt-3 pb-safe backdrop-blur-md md:hidden"
        >
          <div className="flex items-center gap-3">
            <a
              href={telUrl(hotelConfig.phone.primaryDial)}
              aria-label={`Call ${hotelConfig.hotelName} on ${hotelConfig.phone.primary}`}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xs border border-line
                         text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <Phone className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </a>

            <button
              type="button"
              onClick={() => openBooking()}
              className="btn btn-primary h-12 flex-1"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Book Your Stay
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
