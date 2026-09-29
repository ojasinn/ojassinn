import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from 'lucide-react'
import { useState } from 'react'

import Reveal from './Reveal'
import { hotelConfig } from '../config/hotelConfig'
import { reviewSummary, testimonials } from '../data/reviews'

function Stars({ rating = 5 }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? 'fill-[#c59645] text-[#c59645]'
              : 'text-[#c59645]/20'
          }`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function GuestAvatar({ name, index }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const backgrounds = [
    'bg-[#ead7b5] text-[#755522]',
    'bg-[#dce5d5] text-[#53644a]',
    'bg-[#ead8d2] text-[#79594e]',
    'bg-[#d9e2e9] text-[#4d6170]',
    'bg-[#e7dfc9] text-[#6f613d]',
  ]

  return (
    <span
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/80 text-xs font-semibold shadow-sm ${backgrounds[index % backgrounds.length]}`}
    >
      {initials}
    </span>
  )
}

export default function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0)

  if (!testimonials.length) {
    return null
  }

  const visibleReviews = [0, 1, 2].map(
    (offset) =>
      testimonials[(startIndex + offset) % testimonials.length],
  )

  const nextReviews = () => {
    setStartIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    )
  }

  const previousReviews = () => {
    setStartIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    )
  }

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden bg-[#f7f1e8] py-16 sm:py-20 lg:py-24"
    >
      {/* Soft atmospheric background */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#e7c98f]/20 blur-[90px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-[-180px] top-[-100px] h-[520px] w-[520px] rounded-full bg-[#e9cfc2]/35 blur-[100px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-[-180px] left-[38%] h-[420px] w-[420px] rounded-full bg-[#d9e4d3]/25 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container relative">

        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Guest Reviews
            </p>

            <span className="h-px w-8 bg-gold/50" />
          </div>

          <h2
            id="reviews-heading"
            className="mt-4 font-display text-[2.8rem] leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl"
          >
            Moments worth
            <span className="block text-[#b4873d]">
              remembering.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
            The kind words of guests who stayed, relaxed, and made
            Ojas Inn part of their journey.
          </p>
        </Reveal>

        {/* Rating */}
        <Reveal
          delay={0.05}
          y={15}
          className="mt-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl" />

            <div className="relative flex items-center gap-4 rounded-full border border-[#d8c7a9] bg-white/90 px-5 py-3 shadow-[0_10px_35px_rgb(80_60_30/0.08)] backdrop-blur sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="font-display text-3xl leading-none text-ink">
                  {reviewSummary.rating.toFixed(1)}
                </span>

                <Stars rating={reviewSummary.rating} />
              </div>

              <span className="h-5 w-px bg-[#dfd5c5]" />

              <span className="text-xs text-muted">
                {reviewSummary.ratingCount} reviews
              </span>

              <span className="rounded-full bg-[#f4ead9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#a27634]">
                Google
              </span>
            </div>
          </div>
        </Reveal>

        {/* Review cards */}
        <Reveal
          delay={0.1}
          y={25}
          className="mt-12"
        >
          <div className="grid gap-5 lg:grid-cols-3">

            {visibleReviews.map((review, index) => {
              const cardStyles = [
                {
                  card: 'bg-[#fffaf2] border-[#ead7b5]',
                  quote: 'text-[#c79c55]/20',
                  avatar: 'bg-[#ead7b5]',
                },
                {
                  card: 'bg-[#f7faf4] border-[#d8e2d1]',
                  quote: 'text-[#8ca47c]/20',
                  avatar: 'bg-[#dce5d5]',
                },
                {
                  card: 'bg-[#fcf5f2] border-[#ead8d2]',
                  quote: 'text-[#c99583]/20',
                  avatar: 'bg-[#ead8d2]',
                },
              ]

              const style = cardStyles[index]

              return (
                <article
                  key={`${review.id}-${startIndex}-${index}`}
                  className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-[28px] border p-7 shadow-[0_15px_45px_rgb(50_40_25/0.055)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgb(50_40_25/0.10)] sm:p-8 ${style.card}`}
                >
                  {/* Decorative circle */}
                  <div
                    className="absolute -right-12 -top-12 h-32 w-32 rounded-full border-[18px] border-white/30"
                    aria-hidden="true"
                  />

                  {/* Quote */}
                  <Quote
                    className={`absolute right-7 top-7 h-20 w-20 ${style.quote}`}
                    strokeWidth={1}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <Stars rating={review.rating} />

                    <span className="mt-4 inline-flex rounded-full bg-white/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {review.source}
                    </span>
                  </div>

                  <blockquote className="relative mt-7 flex-1 font-display text-[1.35rem] leading-[1.42] tracking-[-0.018em] text-ink sm:text-[1.45rem]">
                    “{review.quote}”
                  </blockquote>

                  <div className="relative mt-8 flex items-center gap-3 border-t border-black/5 pt-5">
                    <GuestAvatar
                      name={review.author}
                      index={startIndex + index}
                    />

                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {review.author}
                      </p>

                      <p className="mt-0.5 text-xs text-muted">
                        {review.context}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setStartIndex(index)}
                  aria-label={`Show reviews starting from review ${index + 1}`}
                  aria-current={index === startIndex ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === startIndex
                      ? 'w-9 bg-gold'
                      : 'w-1.5 bg-[#d8cdbd] hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={previousReviews}
                aria-label="Previous reviews"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d9cdbb] bg-white/80 text-ink shadow-sm transition-all duration-300 hover:border-gold hover:bg-white hover:text-gold"
              >
                <ChevronLeft
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </button>

              <button
                type="button"
                onClick={nextReviews}
                aria-label="Next reviews"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d9cdbb] bg-white/80 text-ink shadow-sm transition-all duration-300 hover:border-gold hover:bg-white hover:text-gold"
              >
                <ChevronRight
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal
          delay={0.15}
          y={15}
          className="mt-10 text-center"
        >
          <a
            href={hotelConfig.maps.reviewsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 rounded-full border border-[#d8c7a9] bg-white/80 px-6 py-3 text-sm font-medium text-ink shadow-sm transition-all duration-300 hover:border-gold hover:bg-white hover:text-gold hover:shadow-md"
          >
            Read all guest reviews
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </a>
        </Reveal>

      </div>
    </section>
  )
}
