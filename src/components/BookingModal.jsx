import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, MessageCircle, X } from 'lucide-react'

import { hotelConfig } from '../config/hotelConfig'
import { roomNames } from '../data/rooms'
import { useBooking } from '../hooks/useBooking'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { bookingInquiryMessage, openWhatsApp } from '../utils/whatsapp'

const EASE = [0.22, 1, 0.36, 1]
const ANY_ROOM = 'Any room'

const guestOptions = ['1', '2', '3', '4 or more']

/** Local YYYY-MM-DD, so the date input never disagrees with the user's calendar. */
function isoDate(date) {
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

function addDays(value, days) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  date.setDate(date.getDate() + days)
  return isoDate(date)
}

export default function BookingModal() {
  const { bookingOpen, closeBooking, preselectedRoom } = useBooking()
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const isCompact = useMediaQuery('(max-width: 639px)')

  const today = useMemo(() => isoDate(new Date()), [])

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [room, setRoom] = useState(ANY_ROOM)
  const [touched, setTouched] = useState(false)

  useFocusTrap(panelRef, bookingOpen, closeBooking)

  // Fresh, sensible defaults every time the sheet opens.
  useEffect(() => {
    if (!bookingOpen) return
    const start = today
    setCheckIn(start)
    setCheckOut(addDays(start, 1))
    setGuests('2')
    setRoom(preselectedRoom && roomNames.includes(preselectedRoom) ? preselectedRoom : ANY_ROOM)
    setTouched(false)
  }, [bookingOpen, preselectedRoom, today])

  const datesValid = Boolean(checkIn) && Boolean(checkOut) && checkOut > checkIn
  const error = touched && !datesValid ? 'Please pick a check-out date after your check-in date.' : ''

  const message = useMemo(
    () => bookingInquiryMessage({ checkIn, checkOut, guests, room }),
    [checkIn, checkOut, guests, room],
  )

  const onCheckInChange = (value) => {
    setCheckIn(value)
    // Keep the stay at least one night long without fighting the user.
    if (value && (!checkOut || checkOut <= value)) setCheckOut(addDays(value, 1))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setTouched(true)
    if (!datesValid) return
    openWhatsApp(message)
    closeBooking()
  }

  const panelMotion = reduceMotion
    ? { initial: false, animate: {}, exit: {} }
    : isCompact
      ? {
          initial: { y: '100%' },
          animate: { y: '0%' },
          exit: { y: '100%' },
          transition: { duration: 0.5, ease: EASE },
        }
      : {
          initial: { opacity: 0, y: 26, scale: 0.985 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 18, scale: 0.99 },
          transition: { duration: 0.45, ease: EASE },
        }

  return (
    <AnimatePresence>
      {bookingOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close booking enquiry"
            onClick={closeBooking}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 cursor-default bg-[#060C14]/70 backdrop-blur-[3px]"
            tabIndex={-1}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            tabIndex={-1}
            {...panelMotion}
            className="relative max-h-[94svh] w-full overflow-y-auto bg-surface
                       sm:max-h-[88vh] sm:max-w-lg sm:rounded-xs sm:surface-float"
          >
            <div className="p-6 sm:p-9">
              <p className="eyebrow">Enquiry</p>
              <h2
                id="booking-modal-title"
                className="mt-4 font-display text-[1.9rem] leading-tight text-ink sm:text-[2.15rem]"
              >
                Book your stay
              </h2>
              <p className="mt-3 max-w-measure-sm font-sans text-[0.875rem] leading-relaxed text-muted">
                Tell us your dates and we will confirm availability and the current tariff on
                WhatsApp. Nothing is charged here.
              </p>

              <form onSubmit={onSubmit} className="mt-8" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="check-in" className="field-label">
                      Check-in
                    </label>
                    <input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      min={today}
                      data-autofocus
                      onChange={(event) => onCheckInChange(event.target.value)}
                      className="field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="check-out" className="field-label">
                      Check-out
                    </label>
                    <input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      min={checkIn ? addDays(checkIn, 1) : today}
                      onChange={(event) => setCheckOut(event.target.value)}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? 'booking-dates-error' : undefined}
                      className="field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="guests" className="field-label">
                      Guests
                    </label>
                    <select
                      id="guests"
                      value={guests}
                      onChange={(event) => setGuests(event.target.value)}
                      className="field"
                    >
                      {guestOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="room-preference" className="field-label">
                      Room preference
                    </label>
                    <select
                      id="room-preference"
                      value={room}
                      onChange={(event) => setRoom(event.target.value)}
                      className="field"
                    >
                      <option value={ANY_ROOM}>{ANY_ROOM}</option>
                      {roomNames.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <p
                    id="booking-dates-error"
                    role="alert"
                    className="mt-4 font-sans text-[0.8125rem] text-gold"
                  >
                    {error}
                  </p>
                )}

                {/* Exactly what will be sent — no hidden behaviour. */}
                <div className="mt-7 border border-line bg-alt p-4">
                  <p className="flex items-center gap-2 font-sans text-2xs uppercase tracking-wider2 text-muted">
                    <CalendarDays className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    Your message
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap font-sans text-[0.8125rem] leading-relaxed text-ink">
                    {message}
                  </pre>
                </div>

                <button type="submit" className="btn btn-primary mt-7 w-full">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  Continue on WhatsApp
                </button>

                <p className="mt-4 text-center font-sans text-2xs leading-relaxed text-muted">
                  Opens a chat with {hotelConfig.hotelName} on {hotelConfig.whatsapp.displayNumber}.
                  This is an enquiry, not a confirmed booking.
                </p>
              </form>
            </div>

            <button
              type="button"
              onClick={closeBooking}
              aria-label="Close booking enquiry"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border
                         border-line text-ink transition-colors duration-300 hover:border-gold
                         hover:text-gold"
            >
              <X className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
