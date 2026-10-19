import { useLayoutEffect, useRef } from 'react'
import { MOTION_OK, SplitText, gsap } from '../lib/motion'
import { STAR_PATH } from './Stars'
import './SectionHeader.css'

type Props = {
  number: string
  label: string
  title: string
  id?: string
}

/** Chapter-style header: a huge outlined number that drifts, and a title that rises word by word. */
export default function SectionHeader({ number, label, title, id }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el)
      const split = SplitText.create(q('.sh-title'), {
        type: 'words',
        mask: 'words',
      })
      split.masks.forEach((m) => m.classList.add('split-mask'))

      gsap.fromTo(
        q('.sh-number'),
        { yPercent: 35, rotationX: -50, opacity: 0 },
        {
          yPercent: -25,
          rotationX: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom 30%',
            scrub: 0.8,
          },
        },
      )
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 78%' } })
        .from(q('.sh-label'), {
          y: 16,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(
          split.words,
          { yPercent: 110, duration: 1.2, stagger: 0.07, ease: 'expo.out' },
          0.1,
        )
        .from(
          q('.sh-rule'),
          { scaleX: 0, duration: 1.4, ease: 'expo.inOut' },
          0.1,
        )
    })
    return () => mm.revert()
  }, [])

  return (
    <div className="section-header" ref={root}>
      <span className="sh-number" aria-hidden="true">
        {number}
        <svg className="star sh-spark" viewBox="-8 -8 16 16">
          <path d={STAR_PATH} />
        </svg>
      </span>
      <div className="sh-text">
        <p className="label sh-label">
          Chapter {number} — {label}
        </p>
        <h2 className="sh-title" id={id}>
          {title}
        </h2>
      </div>
      <span className="sh-rule" aria-hidden="true" />
    </div>
  )
}
