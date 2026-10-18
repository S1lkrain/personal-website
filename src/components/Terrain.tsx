import { forwardRef, useMemo } from 'react'

/*
 * A 3D topographic map built from stacked SVG contour lines.
 * Each contour is its own layer lifted along Z by its elevation, so when the
 * plane is tilted with CSS 3D transforms the lines form a real wireframe hill.
 */

type Contour = { d: string; level: number; peak: boolean }

const SIZE = 1000
const POINTS = 120

// Deterministic "noise": a few phase-shifted sine waves per hill.
function ring(
  cx: number,
  cy: number,
  radius: number,
  level: number,
  seed: number,
): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i < POINTS; i++) {
    const t = (i / POINTS) * Math.PI * 2
    const wobble =
      0.14 * Math.sin(2 * t + seed + level * 0.21) +
      0.08 * Math.sin(3 * t - seed * 1.7 + level * 0.33) +
      0.045 * Math.sin(5 * t + seed * 0.6 - level * 0.4) +
      0.02 * Math.sin(9 * t + level * 0.9)
    const r = radius * (1 + wobble)
    pts.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r * 0.92])
  }
  return pts
}

// Closed Catmull-Rom spline -> cubic Bézier path
function smoothPath(pts: [number, number][]) {
  const n = pts.length
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d + 'Z'
}

function buildHill(
  cx: number,
  cy: number,
  baseRadius: number,
  levels: number,
  seed: number,
  driftX: number,
  driftY: number,
  startLevel = 0,
): Contour[] {
  const out: Contour[] = []
  for (let l = 0; l < levels; l++) {
    const k = l / levels
    const radius = baseRadius * Math.pow(1 - k, 0.85)
    const pts = ring(cx + driftX * l, cy + driftY * l, radius, l, seed)
    out.push({
      d: smoothPath(pts),
      level: startLevel + l,
      peak: l >= levels - 2,
    })
  }
  return out
}

export const TERRAIN_LEVEL_GAP = 22

const Terrain = forwardRef<HTMLDivElement>(function Terrain(_, ref) {
  const contours = useMemo(
    () => [
      ...buildHill(470, 520, 430, 15, 1.3, 4, -5),
      ...buildHill(720, 330, 190, 7, 4.1, -3, 2, 2),
    ],
    [],
  )

  return (
    <div className="terrain" ref={ref} aria-hidden="true">
      <div className="terrain-mouse">
        <div className="terrain-tilt">
          <div className="terrain-spin">
            <div className="terrain-grid" />
            {contours.map((c, i) => (
              <svg
                key={i}
                className={`terrain-layer${c.peak ? ' is-peak' : ''}`}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                data-level={c.level}
                style={{
                  transform: `translateZ(${c.level * TERRAIN_LEVEL_GAP}px)`,
                }}
              >
                <path d={c.d} pathLength={1} />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default Terrain
