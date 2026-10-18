import { useLayoutEffect, useRef } from 'react'
import { site } from '../content/site'
import { MOTION_OK, SplitText, gsap } from '../lib/motion'
import SectionHeader from './SectionHeader'
import './About.css'

export default function About() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el)

      // Words light up as you read, like ink settling on the page
      q('.about-body p').forEach((p) => {
        const split = SplitText.create(p, { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: {
              trigger: p,
              start: 'top 88%',
              end: 'bottom 62%',
              scrub: true,
            },
          },
        )
      })

      gsap.from(q('.fact'), {
        x: -24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: q('.about-grid')[0], start: 'top 75%' },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      className="section about"
      id="about"
      aria-labelledby="about-title"
      ref={root}
    >
      <div className="container">
        <SectionHeader
          number="01"
          label="About"
          title={site.about.title}
          id="about-title"
        />

        <div className="about-grid">
          <aside className="facts" aria-label="Quick facts">
            <p className="label facts-title">Field Notes</p>
            <dl>
              {site.facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt className="label">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="about-body">
            {site.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
