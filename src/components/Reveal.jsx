import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

/**
 * Scroll reveal used across the editorial sections. Deliberately small:
 * a short rise and fade, once, never on re-entry.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  as = 'div',
  className = '',
  amount = 0.35,
  ...rest
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  const reduceMotion = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduceMotion) {
    const Plain = as
    return (
      <Plain ref={ref} className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
