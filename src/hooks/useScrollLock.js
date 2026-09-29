import { useEffect } from 'react'

/**
 * Freezes the page behind an overlay without the layout jumping when the
 * scrollbar disappears, and restores the exact scroll position on close.
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined

    const { body } = document
    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.width = previous.width
      body.style.paddingRight = previous.paddingRight
      window.scrollTo(0, scrollY)
    }
  }, [active])
}

export default useScrollLock
