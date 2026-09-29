import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { useScrollLock } from './useScrollLock'

/**
 * Holds the two overlays that any section might need to open: the booking
 * enquiry and the room detail. Keeps App.jsx free of prop drilling.
 */

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [preselectedRoom, setPreselectedRoom] = useState('')
  const [activeRoom, setActiveRoom] = useState(null)

  // Locked in one place so handing over from the room sheet to the booking
  // sheet never double-locks or restores the scroll position twice.
  useScrollLock(bookingOpen || activeRoom !== null)

  const openBooking = useCallback((roomName = '') => {
    setPreselectedRoom(roomName)
    setActiveRoom(null)
    setBookingOpen(true)
  }, [])

  const closeBooking = useCallback(() => setBookingOpen(false), [])
  const openRoom = useCallback((room) => setActiveRoom(room), [])
  const closeRoom = useCallback(() => setActiveRoom(null), [])

  const value = useMemo(
    () => ({
      bookingOpen,
      preselectedRoom,
      activeRoom,
      openBooking,
      closeBooking,
      openRoom,
      closeRoom,
    }),
    [bookingOpen, preselectedRoom, activeRoom, openBooking, closeBooking, openRoom, closeRoom],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking must be used inside <BookingProvider>')
  return context
}
