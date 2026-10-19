import { useLayoutEffect, useRef } from 'react'
import { site } from '../content/site'
import { MOTION_OK, gsap } from '../lib/motion'
import Stars from './Stars'
import './Stats.css'

/** A full-bleed dark band of big numbers that count up as they arrive. */
export default function Stats() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el)

      // The band opens like a lens from a narrow strip
      gsap.fromTo(
        el,
        { clipPath: 'inset(12% 6% 12% 6% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top 25%',
            scrub: true,
          },
        },
      )

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 65%' },
      })
      q('.stat').forEach((stat, i) => {
        const num = stat.querySelector<HTMLElement>('.stat-value')!
        const target = Number(num.dataset.value)
        const counter = { v: 0 }
        tl.from(
          stat,
          { y: 60, opacity: 0, duration: 1, ease: 'expo.out' },
          i * 0.12,
        )
          .to(
            counter,
            {
              v: target,
              duration: 1.8,
              ease: 'power3.out',
              onUpdate: () => {
                num.textContent = String(Math.round(counter.v))
              },
            },
            i * 0.12,
          )
          .from(
            stat.querySelector('.stat-bar'),
            { scaleX: 0, duration: 1.4, ease: 'expo.inOut' },
            i * 0.12 + 0.2,
          )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="stats" aria-label="By the numbers" ref={root}>
      <Stars seed={13} count={10} sizeRange={[7, 14]} />
      <div className="container">
        <p className="label stats-label">By the numbers</p>
        <ul className="stats-grid">
          {site.stats.map((s) => (
            <li className="stat" key={s.label}>
              <p className="stat-number">
                {s.prefix && <span className="stat-affix">{s.prefix}</span>}
                <span className="stat-value" data-value={s.value}>
                  {s.value}
                </span>
                {s.suffix && <span className="stat-affix">{s.suffix}</span>}
              </p>
              <span className="stat-bar" aria-hidden="true" />
              <p className="stat-label">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
