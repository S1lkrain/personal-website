import { useLayoutEffect, useRef } from 'react'
import { site } from '../content/site'
import { MOTION_OK, gsap } from '../lib/motion'
import { Rich } from '../lib/rich'
import SectionHeader from './SectionHeader'
import './Leadership.css'

export default function Leadership() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el)

      // The timeline line draws as you scroll through it
      gsap.fromTo(
        q('.tl-progress'),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: q('.timeline')[0],
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        },
      )

      q('.tl-item').forEach((item) => {
        gsap
          .timeline({ scrollTrigger: { trigger: item, start: 'top 75%' } })
          .from(item.querySelector('.tl-dot'), {
            scale: 0,
            duration: 0.6,
            ease: 'back.out(3)',
          })
          .from(
            item.querySelector('.tl-card'),
            {
              x: 60,
              rotationY: -18,
              opacity: 0,
              transformPerspective: 1000,
              transformOrigin: '0% 50%',
              duration: 1.2,
              ease: 'expo.out',
            },
            0.05,
          )
          .from(
            item.querySelectorAll('.tl-points li'),
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
            },
            0.3,
          )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      className="section leadership"
      id="leadership"
      aria-labelledby="leadership-title"
      ref={root}
    >
      <div className="container">
        <SectionHeader
          number="03"
          label="Leadership"
          title="Leadership & Community"
          id="leadership-title"
        />

        <div className="timeline">
          <span className="tl-track" aria-hidden="true">
            <span className="tl-progress" />
          </span>
          <ol className="tl-list">
            {site.leadership.map((r) => (
              <li className="tl-item" key={r.org}>
                <span className="tl-dot" aria-hidden="true" />
                <article className="tl-card">
                  <header className="tl-head">
                    <p className="label">{r.period}</p>
                    <h3 className="tl-org">{r.org}</h3>
                    <p className="tl-role">{r.role}</p>
                  </header>
                  <ul className="tl-points">
                    {r.points.map((pt, i) => (
                      <li key={i}>
                        <Rich text={pt} />
                      </li>
                    ))}
                  </ul>
                  {r.link && (
                    <a
                      className="ulink tl-link"
                      href={r.link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {r.link.label} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
