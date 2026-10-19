import type { Project } from '../content/site'

/** A sprinkle of twinkling four-point stars over a card's illustration plate. */
export function PlateStars({ seed }: { seed: number }) {
  // Deterministic pseudo-random, so layouts are stable across renders
  const rnd = (n: number) => {
    const x = Math.sin(seed * 39.17 + n * 17.23) * 43758.5453
    return x - Math.floor(x)
  }
  const stars = Array.from({ length: 8 }, (_, i) => ({
    // Edge columns only, keeping the center clear for the motif
    left: i % 2 === 0 ? 5 + rnd(i) * 24 : 70 + rnd(i) * 25,
    top: 5 + rnd(i + 10) * 88,
    size: 9 + rnd(i + 20) * 10,
    delay: rnd(i + 30) * 4,
    dur: 2.8 + rnd(i + 40) * 2.4,
  }))
  return (
    <>
      {stars.map((s, i) => (
        <svg
          key={i}
          className="plate-star"
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
          <path d="M0 -7 C0.6 -2 2 -0.6 7 0 C2 0.6 0.6 2 0 7 C-0.6 2 -2 0.6 -7 0 C-2 -0.6 -0.6 -2 0 -7 Z" />
        </svg>
      ))}
    </>
  )
}

/*
 * Small generative illustrations, one per project, drawn in SVG so they
 * follow the active palette. Elements marked .m-anim are animated on scroll.
 */
export default function ProjectMotif({ motif }: { motif: Project['motif'] }) {
  switch (motif) {
    case 'board':
      // A tactics board: grid cells with a few occupied squares and a move path
      return (
        <svg viewBox="0 0 240 240" className="motif">
          {Array.from({ length: 36 }, (_, i) => {
            const x = (i % 6) * 36 + 12
            const y = Math.floor(i / 6) * 36 + 12
            const filled = [7, 15, 20, 28].includes(i)
            return (
              <rect
                key={i}
                className={filled ? 'm-fill m-anim' : 'm-cell'}
                x={x}
                y={y}
                width="30"
                height="30"
                rx="3"
              />
            )
          })}
          <path
            className="m-accent m-anim m-draw"
            d="M39 69 L111 69 L111 141 L183 141"
            pathLength={1}
          />
          <circle className="m-accent-fill m-anim" cx="183" cy="141" r="7" />
        </svg>
      )
    case 'pipeline':
      // Generate → validate → evaluate → accept, with one rejected branch
      return (
        <svg viewBox="0 0 240 240" className="motif">
          <path
            className="m-line m-anim m-draw"
            d="M30 120 H210"
            pathLength={1}
          />
          <path
            className="m-line m-anim m-draw"
            d="M120 120 C120 170 150 190 180 190"
            pathLength={1}
          />
          {[30, 75, 120, 165].map((x, i) => (
            <rect
              key={x}
              className="m-node m-anim"
              x={x - 14}
              y={106}
              width="28"
              height="28"
              rx={i === 0 ? 14 : 4}
            />
          ))}
          <circle className="m-accent-fill m-anim" cx="210" cy="120" r="14" />
          <path className="m-x m-anim" d="M174 184 l12 12 M186 184 l-12 12" />
          <path className="m-check m-anim" d="M203 120 l5 5 l9 -10" />
        </svg>
      )
    case 'rings':
      // Members gathering: concentric orbits with dots
      return (
        <svg viewBox="0 0 240 240" className="motif">
          {[40, 70, 100].map((r) => (
            <circle
              key={r}
              className="m-line m-anim m-draw"
              cx="120"
              cy="120"
              r={r}
              pathLength={1}
            />
          ))}
          {Array.from({ length: 20 }, (_, i) => {
            const ring = [40, 70, 100][i % 3]
            const a = (i / 20) * Math.PI * 2 + i
            return (
              <circle
                key={i}
                className="m-fill m-anim"
                cx={120 + Math.cos(a) * ring}
                cy={120 + Math.sin(a) * ring}
                r="5"
              />
            )
          })}
          <circle className="m-accent-fill m-anim" cx="120" cy="120" r="14" />
        </svg>
      )
    case 'fracture':
      // A contour map that breaks off — the shelved prototype
      return (
        <svg viewBox="0 0 240 240" className="motif">
          {[90, 70, 50, 30].map((r, i) => (
            <path
              key={r}
              className={`m-line m-anim m-draw${i === 3 ? ' m-accent-stroke' : ''}`}
              d={`M${120 - r} 120 A${r} ${r * 0.8} 0 1 1 ${120 + r * 0.7} ${120 + r * 0.55}`}
              pathLength={1}
            />
          ))}
          <path className="m-line m-dash m-anim" d="M150 160 L205 210" />
        </svg>
      )
  }
}
