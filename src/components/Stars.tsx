import './Stars.css'

export const STAR_PATH =
  'M0 -7 C0.6 -2 2 -0.6 7 0 C2 0.6 0.6 2 0 7 C-0.6 2 -2 0.6 -7 0 C-2 -0.6 -0.6 -2 0 -7 Z'

type Props = {
  seed: number
  count?: number
  /** Keep the middle clear, for plates with an illustration in the center */
  avoidCenter?: boolean
  sizeRange?: [number, number]
  className?: string
}

/** A field of twinkling four-point stars; positions are deterministic per seed. */
export default function Stars({
  seed,
  count = 8,
  avoidCenter = false,
  sizeRange = [9, 19],
  className,
}: Props) {
  const rnd = (n: number) => {
    const x = Math.sin(seed * 39.17 + n * 17.23) * 43758.5453
    return x - Math.floor(x)
  }
  const stars = Array.from({ length: count }, (_, i) => ({
    left: avoidCenter
      ? i % 2 === 0
        ? 5 + rnd(i) * 24
        : 70 + rnd(i) * 25
      : 2 + rnd(i) * 94,
    top: 5 + rnd(i + 10) * 88,
    size: sizeRange[0] + rnd(i + 20) * (sizeRange[1] - sizeRange[0]),
    delay: rnd(i + 30) * 4,
    dur: 2.8 + rnd(i + 40) * 2.4,
  }))
  return (
    <div
      className={`stars${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <svg
          key={i}
          className="star"
          viewBox="-8 -8 16 16"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              '--tw-delay': `${s.delay}s`,
              '--tw-dur': `${s.dur}s`,
            } as React.CSSProperties
          }
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  )
}
