import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'

import BrandMark from './BrandMark'
import { hotelConfig } from '../config/hotelConfig'
import {
  generalInquiryMessage,
  mailtoUrl,
  openWhatsApp,
  telUrl,
} from '../utils/whatsapp'

const { address, maps, phone, policies } = hotelConfig

const quickLinks = [
  { id: 'home', label: 'Home' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
]

export default function Footer() {
  const email = mailtoUrl()

  const goTo = (id) => {
    const target = document.getElementById(id)
    if (!target) return

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    target.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <footer className="border-t border-line bg-alt pb-24 pt-12 md:pb-12 md:pt-14">
      <div className="container">

        {/* Main footer */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <BrandMark
                className="h-10 w-10 text-gold"
                withRing
              />

              <div>
                <p className="font-display text-[1.45rem] leading-none tracking-wide text-ink">
                  {hotelConfig.hotelName}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-gold">
                  {hotelConfig.tagline}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-muted">
              {hotelConfig.shortDescription}
            </p>

            <a
              href={maps.directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-gold"
            >
              Find Ojas Inn
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Contact
            </p>

            <address className="mt-4 flex items-start gap-3 not-italic text-sm leading-6 text-ink">
              <MapPin
                className="mt-1 h-4 w-4 shrink-0 text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <span>
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.line3}
                <br />
                {address.city}, {address.state} {address.postalCode}
              </span>
            </address>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={telUrl(phone.primaryDial)}
                className="inline-flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
              >
                <Phone
                  className="h-4 w-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {phone.primary}
              </a>

              <a
                href={telUrl(phone.secondaryDial)}
                className="inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-gold"
              >
                <span className="w-4" />
                {phone.secondary}
              </a>

              <button
                type="button"
                onClick={() => openWhatsApp(generalInquiryMessage())}
                className="inline-flex items-center gap-3 text-left text-sm text-ink transition-colors hover:text-gold"
              >
                <MessageCircle
                  className="h-4 w-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                WhatsApp {hotelConfig.whatsapp.displayNumber}
              </button>

              {email && (
                <a
                  href={email}
                  className="inline-flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
                >
                  <Mail
                    className="h-4 w-4 text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {hotelConfig.email}
                </a>
              )}

              <a
                href={hotelConfig.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
              >
                <Instagram
                  className="h-4 w-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {hotelConfig.instagramHandle}
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1 lg:gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                Explore
              </p>

              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => goTo(link.id)}
                      className="text-sm text-ink transition-colors hover:text-gold"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                Stay
              </p>

              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Check-in</dt>
                  <dd className="text-ink">{policies.checkIn}</dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Check-out</dt>
                  <dd className="text-ink">{policies.checkOut}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-line pt-5">
          <div className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {hotelConfig.hotelName}. All rights reserved.
            </p>

            <p>
              {address.city}, {address.state} · Photographs are of the actual property.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
