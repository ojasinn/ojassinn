import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'

import BrandMark from './BrandMark'
import { hotelConfig } from '../config/hotelConfig'
import { useBooking } from '../hooks/useBooking'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useScrollLock } from '../hooks/useScrollLock'
import { useTheme } from '../hooks/useTheme'
import { telUrl } from '../utils/whatsapp'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
]

function ThemeToggle({ scrolled }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`
        relative grid h-10 w-10 place-items-center rounded-full
        border transition-all duration-300
        ${scrolled
          ? 'border-white/25 bg-black/10 text-white hover:border-[#DDB86F]/70 hover:bg-white/10'
          : 'border-white/20 bg-white/[0.08] text-white hover:border-white/50 hover:bg-white/15'
        }
      `}
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          className={`absolute inset-0 h-[18px] w-[18px] transition-all duration-[420ms] ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-50 opacity-0'
          }`}
          strokeWidth={1.7}
        />

        <Moon
          className={`absolute inset-0 h-[18px] w-[18px] transition-all duration-[420ms] ${
            isDark
              ? 'rotate-90 scale-50 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
          strokeWidth={1.7}
        />
      </span>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  const { openBooking } = useBooking()
  const reduceMotion = useReducedMotion()
  const menuRef = useRef(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useScrollLock(menuOpen)
  useFocusTrap(menuRef, menuOpen, closeMenu)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      const sections = links
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean)

      if (!sections.length) return

      const marker = window.innerHeight * 0.28

      let current = 'home'
      let closestDistance = Infinity

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const distance = Math.abs(rect.top - marker)

        if (rect.top <= marker + 40 && distance < closestDistance) {
          closestDistance = distance
          current = section.id
        }
      })

      setActive(current)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    updateActiveSection()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    const media = window.matchMedia('(min-width: 1024px)')

    const onChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    media.addEventListener('change', onChange)

    return () => media.removeEventListener('change', onChange)
  }, [menuOpen])

  const goTo = (id) => (event) => {
    event.preventDefault()
    setMenuOpen(false)

    const target = document.getElementById(id)

    if (!target) return

    setActive(id)

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.75,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-500
          ${
            scrolled
              ? 'border-b border-[#102337]/10 bg-[#F8F5EF]/[0.94] shadow-[0_8px_30px_rgba(16,35,55,0.10)] backdrop-blur-2xl'
              : 'border-b border-white/[0.10] bg-gradient-to-b from-[#081827]/[0.68] via-[#081827]/[0.28] to-transparent'
          }
        `}
      >
        <nav
          aria-label="Primary"
          className="container flex h-[70px] items-center justify-between gap-5 md:h-[76px]"
        >
          {/* BRAND */}
          <a
            href="#home"
            onClick={goTo('home')}
            className={`group flex shrink-0 items-center gap-3 transition-colors duration-300 ${scrolled ? "text-[#102337]" : "text-white"}`}
          >
            <BrandMark
              className="h-9 w-9 text-[#DDB86F] transition-transform duration-300 group-hover:scale-105"
            />

            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] tracking-[0.17em] md:text-[1.15rem]">
                OJAS INN
              </span>

              <span className="mt-1 font-sans text-[0.52rem] font-medium uppercase tracking-[0.25em] text-white/55">
                {hotelConfig.tagline}
              </span>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map(({ id, label }) => {
              const isActive = active === id

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={goTo(id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    relative px-4 py-2.5
                    font-sans text-[0.76rem] font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? scrolled
                          ? 'text-[#102337]'
                          : 'text-white'
                        : scrolled
                          ? 'text-[#657383] hover:text-[#102337]'
                          : 'text-white/70 hover:text-white'
                    }
                  `}
                >
                  {label}

                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#DDB86F]"
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <ThemeToggle scrolled={scrolled} />

            <button
              type="button"
              onClick={() => openBooking()}
              className="
                hidden h-10 items-center justify-center
                rounded-full bg-[#DDB86F] px-5
                font-sans text-[0.68rem] font-bold uppercase
                tracking-[0.14em] text-[#102337]
                shadow-[0_8px_24px_rgba(0,0,0,0.16)]
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-[#F0D38F]
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.22)]
                lg:inline-flex
              "
            >
              Book Your Stay
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="
                grid h-10 w-10 place-items-center rounded-full
                border border-white/15 bg-white/[0.06]
                text-white transition-all duration-300
                hover:border-[#DDB86F]/60 hover:bg-white/10
                lg:hidden
              "
            >
              <Menu className="h-[19px] w-[19px]" strokeWidth={1.7} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[60] bg-[#F9F7F2] lg:hidden"
          >
            <div className="container flex h-[70px] items-center justify-between">
              <span className="flex items-center gap-3 text-[#102337]">
                <BrandMark className="h-9 w-9 text-[#B38335]" />

                <span className="font-display text-[1.05rem] tracking-[0.16em]">
                  OJAS INN
                </span>
              </span>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                data-autofocus
                className="
                  grid h-10 w-10 place-items-center rounded-full
                  border border-[#102337]/10 text-[#102337]
                  transition-all duration-300
                  hover:border-[#B38335] hover:text-[#B38335]
                "
              >
                <X className="h-[19px] w-[19px]" strokeWidth={1.7} />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="container mt-8 flex flex-col"
            >
              {links.map(({ id, label }, index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={goTo(id)}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.42,
                    delay: 0.05 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    flex items-center justify-between
                    border-b border-[#102337]/10 py-5
                    font-display text-[2rem] text-[#102337]
                    transition-colors duration-300
                    hover:text-[#B38335]
                  "
                >
                  <span>{label}</span>
                  <ArrowRightSmall />
                </motion.a>
              ))}

              <motion.button
                type="button"
                onClick={() => {
                  closeMenu()
                  openBooking()
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.42,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mt-9 flex h-13 w-full items-center
                  justify-center rounded-full
                  bg-[#102337] px-6
                  font-sans text-[0.72rem] font-bold uppercase
                  tracking-[0.16em] text-white
                  transition-all duration-300
                  hover:bg-[#18344D]
                "
              >
                Book Your Stay
              </motion.button>

              <p className="mt-6 font-sans text-sm text-[#657383]">
                Prefer to call?{' '}
                <a
                  href={telUrl(hotelConfig.phone.primaryDial)}
                  className="font-medium text-[#102337] underline decoration-[#B38335]/60 underline-offset-4"
                >
                  {hotelConfig.phone.primary}
                </a>
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ArrowRightSmall() {
  return (
    <span className="text-[#B38335]">
      →
    </span>
  )
}
