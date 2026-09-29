import { hotelConfig } from '../config/hotelConfig'

/**
 * WhatsApp helpers. Every message is composed here so the wording stays
 * consistent and the number lives only in hotelConfig.
 */

const GREETING = `Hello ${hotelConfig.hotelName},`

/** "2026-09-15" -> "15 September 2026". Returns '' for empty/invalid input. */
export function formatStayDate(value) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** Joins lines and trims stray blanks so the message reads cleanly in chat. */
const compose = (lines) => lines.filter(Boolean).join('\n')

export function generalInquiryMessage() {
  return compose([
    GREETING,
    'I would like to check room availability.',
    '',
    'Please share availability and pricing.',
  ])
}

export function roomInquiryMessage(roomName) {
  if (!roomName) return generalInquiryMessage()
  return compose([
    GREETING,
    `I would like to check availability for the ${roomName}.`,
    '',
    'Please share availability and pricing.',
  ])
}

export function bookingInquiryMessage({ checkIn, checkOut, guests, room } = {}) {
  const checkInText = formatStayDate(checkIn)
  const checkOutText = formatStayDate(checkOut)

  return compose([
    GREETING,
    'I would like to check room availability.',
    '',
    checkInText && `Check-in: ${checkInText}`,
    checkOutText && `Check-out: ${checkOutText}`,
    guests && `Guests: ${guests}`,
    room && room !== 'Any room' && `Room: ${room}`,
    '',
    'Please share availability and pricing.',
  ])
}

/** Builds a wa.me link with the message properly URL-encoded. */
export function whatsappUrl(message) {
  const text = encodeURIComponent(message ?? generalInquiryMessage())
  return `https://wa.me/${hotelConfig.whatsapp.number}?text=${text}`
}

/** Opens WhatsApp in a new tab. Safe to call from any event handler. */
export function openWhatsApp(message) {
  const url = whatsappUrl(message)
  if (typeof window === 'undefined') return url
  window.open(url, '_blank', 'noopener,noreferrer')
  return url
}

export const telUrl = (number = hotelConfig.phone.primaryDial) => `tel:${number}`
export const mailtoUrl = (email = hotelConfig.email) => (email ? `mailto:${email}` : null)

export default openWhatsApp
