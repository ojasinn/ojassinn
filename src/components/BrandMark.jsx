/**
 * The lotus mark, drawn from the signage at the property entrance.
 * Uses currentColor so it inherits whatever the surrounding text colour is.
 */
export default function BrandMark({ className = 'h-7 w-7', withRing = true }) {
  const petal = 'M32 15C37.4 24 37.4 33.5 32 41.5C26.6 33.5 26.6 24 32 15Z'
  const outerPetal = 'M32 21C36.2 28 36.2 35.5 32 41.5C27.8 35.5 27.8 28 32 21Z'

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={petal} />
        <path d={petal} transform="rotate(-36 32 41.5)" />
        <path d={petal} transform="rotate(36 32 41.5)" />
        <path d={outerPetal} transform="rotate(-68 32 41.5)" />
        <path d={outerPetal} transform="rotate(68 32 41.5)" />
      </g>
      {withRing && (
        <path
          d="M20 47.5C24 50.2 27.8 51.4 32 51.4C36.2 51.4 40 50.2 44 47.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.7"
        />
      )}
    </svg>
  )
}
