import { ArrowUpRight, MapPin, Navigation, Phone } from 'lucide-react'

import Reveal from './Reveal'
import { hotelConfig } from '../config/hotelConfig'
import { telUrl } from '../utils/whatsapp'

const { address, maps, nearby, phone } = hotelConfig

const satelliteMapUrl =
  'https://maps.google.com/maps?q=18.75324,73.666549&t=k&z=15&output=embed'

export default function LocationSection() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="bg-alt py-12 sm:py-14 lg:min-h-[720px] lg:flex lg:items-center lg:py-16"
    >
      <div className="container w-full">
        <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-14">

          {/* Information */}
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Location</p>

            <h2
              id="location-heading"
              className="mt-3 text-title text-balance"
            >
              Talegaon MIDC, Pune.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              On Talegaon MIDC Road, close to D.Y. Patil University,
              Talegaon MIDC and the Mumbai–Pune Expressway.
            </p>

            <div className="mt-7 border-y border-line py-6">
              <div className="flex items-start gap-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold">
                  <MapPin
                    className="h-4 w-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>

                <address className="not-italic text-sm leading-6 text-ink">
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.line3}
                  <br />
                  {address.city}, {address.state} {address.postalCode}
                </address>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                <a
                  href={telUrl(phone.primaryDial)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-gold"
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
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {phone.secondary}
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={maps.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary"
              >
                <Navigation
                  className="h-4 w-4"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                Get Directions
              </a>

              <a
                href={maps.googleMapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-ink transition-colors hover:text-gold"
              >
                Google Maps
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>

          {/* Interactive satellite map */}
          <Reveal
            delay={0.1}
            y={20}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-[2px] border border-line bg-surface shadow-[0_18px_50px_rgb(15_35_53_/_0.08)]">
              <div className="relative h-[280px] sm:h-[330px] lg:h-[390px]">
                <iframe
                  title={`Satellite map showing the location of ${hotelConfig.hotelName} in ${address.city}`}
                  src={satelliteMapUrl}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />

                <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/25 bg-[#102337]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-sm">
                  Satellite view
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line px-4 py-3 sm:px-5">
                <span className="text-xs text-muted">
                  Ojas Inn · Talegaon MIDC
                </span>

                <a
                  href={maps.directionsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 text-xs font-medium text-ink hover:text-gold"
                >
                  Directions
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Nearby */}
        <Reveal delay={0.14}>
          <div className="mt-8 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((place, index) => (
              <div
                key={place.name}
                className={`
                  flex items-center justify-between gap-4 py-4
                  sm:px-5
                  lg:py-4
                  ${index !== 0 ? 'border-t border-line sm:border-t-0' : ''}
                  ${index % 2 === 1 ? 'sm:border-l sm:border-line' : ''}
                  ${index >= 2 ? 'lg:border-l lg:border-line' : ''}
                  ${index === 0 ? 'sm:pl-0' : ''}
                  ${index === nearby.length - 1 ? 'lg:pr-0' : ''}
                `}
              >
                <div>
                  <p className="text-sm font-medium text-ink">
                    {place.name}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    {place.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
