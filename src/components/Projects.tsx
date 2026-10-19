import { useLayoutEffect, useRef } from 'react'
import { site } from '../content/site'
import { FINE_POINTER, MOTION_OK, gsap } from '../lib/motion'
import { Rich } from '../lib/rich'
import ProjectMotif from './ProjectMotif'
import Stars from './Stars'
import SectionHeader from './SectionHeader'
import './Projects.css'

export default function Projects() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el)
      const wraps = q<HTMLElement>('.pcard-wrap')

      wraps.forEach((wrap, i) => {
        const card = wrap.querySelector<HTMLElement>('.pcard')!

        // Each card swings up out of the page as it arrives
        gsap.fromTo(
          card,
          { rotationX: -28, y: 120, transformPerspective: 1400 },
          {
            rotationX: 0,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top bottom',
              end: 'top 45%',
              scrub: 1,
            },
          },
        )

        // Its illustration draws itself in
        gsap.from(card.querySelectorAll('.m-anim'), {
          opacity: 0,
          scale: 0.4,
          transformOrigin: '50% 50%',
          duration: 0.9,
          stagger: 0.025,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: wrap, start: 'top 55%' },
        })
        gsap.fromTo(
          card.querySelectorAll('.m-draw'),
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            stagger: 0.15,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: wrap, start: 'top 55%' },
          },
        )

        // ...and sinks back into the stack when the next card covers it.
        // This animates the sticky wrap, not the card: on tall viewports the
        // card can still be mid-arrival, and two scrub tweens on the same
        // element would fight over rotationX/y.
        const next = wraps[i + 1]
        if (!next) return
        gsap.to(wrap, {
          scale: 0.9,
          rotationX: 10,
          y: -30,
          transformOrigin: '50% 0%',
          transformPerspective: 1600,
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 0.8,
          },
        })
        gsap.to(card.querySelector('.pcard-shade'), {
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 0.8,
          },
        })
      })

      // Pointer tilt with a moving glare (desktop only)
      if (!window.matchMedia(FINE_POINTER).matches) return
      const cleanups = q<HTMLElement>('.pcard-tilt').map((tilt) => {
        // Depth comes from .pcard's flat `perspective`; the card is not a
        // preserve-3d context, so nothing can render behind its background
        gsap.set(tilt, { '--gx': '50%', '--gy': '0%' })
        const rx = gsap.quickTo(tilt, 'rotationX', {
          duration: 0.9,
          ease: 'power3',
        })
        const ry = gsap.quickTo(tilt, 'rotationY', {
          duration: 0.9,
          ease: 'power3',
        })
        // The glare trails the pointer with the same easing as the tilt
        const gx = gsap.quickTo(tilt, '--gx', { duration: 0.9, ease: 'power3' })
        const gy = gsap.quickTo(tilt, '--gy', { duration: 0.9, ease: 'power3' })
        const move = (e: PointerEvent) => {
          const r = tilt.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          ry((x - 0.5) * 8)
          rx((0.5 - y) * 6)
          gx(x * 100)
          gy(y * 100)
        }
        const leave = () => {
          rx(0)
          ry(0)
        }
        tilt.addEventListener('pointermove', move)
        tilt.addEventListener('pointerleave', leave)
        return () => {
          tilt.removeEventListener('pointermove', move)
          tilt.removeEventListener('pointerleave', leave)
        }
      })
      return () => cleanups.forEach((c) => c())
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      className="section projects"
      id="projects"
      aria-labelledby="projects-title"
      ref={root}
    >
      <div className="container">
        <SectionHeader
          number="02"
          label="Projects"
          title="Things I've Built"
          id="projects-title"
        />

        <ol className="pstack">
          {site.projects.map((p, i) => (
            <li
              className="pcard-wrap"
              key={p.id}
              style={{ '--i': i } as React.CSSProperties}
            >
              <article className="pcard" aria-labelledby={`${p.id}-title`}>
                <div className="pcard-tilt">
                  <div className="pcard-text">
                    <div className="pcard-meta">
                      <span className="pcard-index">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`pcard-status status-${p.status.replace(' ', '-').toLowerCase()}`}
                      >
                        {p.status}
                      </span>
                    </div>

                    <h3 className="pcard-title" id={`${p.id}-title`}>
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <p className="pcard-subtitle">{p.subtitle}</p>
                    )}

                    <div className="pcard-desc">
                      {p.description.map((d, j) => (
                        <p key={j}>
                          <Rich text={d} />
                        </p>
                      ))}
                    </div>

                    <ul className="pcard-tags" aria-label="Skills">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>

                    {p.links.length > 0 && (
                      <div className="pcard-links">
                        {p.links.map((l) => (
                          <a
                            key={l.href}
                            className="ulink"
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {l.label} <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pcard-plate" aria-hidden="true">
                    <ProjectMotif motif={p.motif} />
                    <Stars seed={i + 1} avoidCenter sizeRange={[9, 19]} />
                  </div>
                  <span className="pcard-glare" aria-hidden="true" />
                </div>
                <span className="pcard-shade" aria-hidden="true" />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
