import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

import { useMediaQuery } from '../hooks/useMediaQuery'

const INTERACTIVE = 'a[href], button, [role="button"], input, select, textarea, label, iframe'

/**
 * A quiet two-part cursor for mice and trackpads only.
 *
 * Touch devices, coarse pointers and anyone who asked for reduced motion keep
 * their native cursor — the `cursor-ready` class on <html> is what switches
 * the system cursor off, so if this component never mounts nothing changes.
 */
function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.35 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.35 })

  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('cursor-ready')

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) setVisible(true)
    }
    const onOver = (event) => {
      const target = event.target
      setHovering(Boolean(target instanceof Element && target.closest(INTERACTIVE)))
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      root.classList.remove('cursor-ready')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [x, y, visible])

  const scale = pressed ? 0.8 : hovering ? 1.9 : 1

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.span
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0 block"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.span
          animate={{ scale }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className={`block h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border
                      transition-colors duration-300 ${
                        hovering ? 'border-gold bg-gold/10' : 'border-ink/35'
                      }`}
        />
      </motion.span>

      <motion.span
        style={{ x, y }}
        className="absolute left-0 top-0 block"
        animate={{ opacity: visible && !hovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </motion.span>
    </div>
  )
}

export default function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)')
  const reduceMotion = useReducedMotion()

  if (!finePointer || reduceMotion) return null
  return <Cursor />
}
