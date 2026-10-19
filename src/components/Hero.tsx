import { useLayoutEffect, useRef } from 'react'
import { site } from '../content/site'
import {
  FINE_POINTER,
  MOTION_OK,
  ScrollTrigger,
  SplitText,
  gsap,
} from '../lib/motion'
import { scrollToHash } from '../lib/scroll'
import Terrain, { TERRAIN_LEVEL_GAP } from './Terrain'
import './Hero.css'

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const terrain = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el)
      const layers = q<SVGSVGElement>('.terrain-layer')
      const paths = q<SVGPathElement>('.terrain-layer path')
      const tilt = q('.terrain-tilt')[0]
      const spin = q('.terrain-spin')[0]

      const name = SplitText.create(q('.hero-name-line'), {
        type: 'chars',
        mask: 'chars',
      })
      name.masks.forEach((m) => m.classList.add('split-mask'))
      const bio = SplitText.create(q('.hero-bio'), {
        type: 'words',
        mask: 'words',
      })
      bio.masks.forEach((m) => m.classList.add('split-mask'))

      gsap.set(tilt, { rotationX: 58 })

      // ---- Intro: terrain rises out of a flat map, then the name lands ----
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      intro
        .from(tilt, { rotationX: 20, scale: 0.85, duration: 2.4 }, 0)
        .fromTo(
          paths,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 2,
            stagger: 0.04,
            ease: 'power3.inOut',
          },
          0,
        )
        .fromTo(
          layers,
          { z: 0 },
          {
            z: (_i: number, t: Element) =>
              Number((t as HTMLElement).dataset.level) * TERRAIN_LEVEL_GAP,
            duration: 2.6,
            stagger: 0.03,
            ease: 'power4.out',
          },
          0.3,
        )
        .from(q('.hero-kicker'), { y: 20, opacity: 0, duration: 1 }, 0.3)
        .from(name.chars, { yPercent: 110, duration: 1.3, stagger: 0.035 }, 0.4)
        .from(
          q('.hero-frame'),
          { scaleX: 0, duration: 1.2, ease: 'expo.inOut' },
          0.9,
        )
        .from(q('.hero-subtitle'), { y: 24, opacity: 0, duration: 1 }, 1.0)
        .from(bio.words, { yPercent: 110, duration: 1.1, stagger: 0.012 }, 1.1)
        .from(
          q('.hero-ctas > *'),
          { y: 24, opacity: 0, duration: 1, stagger: 0.1 },
          1.3,
        )
        .from(q('.hero-scroll'), { opacity: 0, duration: 1 }, 1.8)

      // ---- Idle: the map slowly turns ----
      gsap.to(spin, {
        rotationZ: '+=360',
        duration: 160,
        ease: 'none',
        repeat: -1,
      })

      // ---- Scroll: fly over the terrain as the hero leaves ----
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
        .to(tilt, { rotationX: 74, scale: 1.45, yPercent: 18, ease: 'none' }, 0)
        .to(terrain.current, { opacity: 0.15, ease: 'none' }, 0)
        .to(q('.hero-content'), { yPercent: -18, opacity: 0, ease: 'none' }, 0)

      // ---- Meteors: an occasional shooting star across the sky ----
      const meteor = q('.meteor')[0]
      let meteorStopped = false
      let meteorTween: gsap.core.Timeline | gsap.core.Tween | null = null
      const launch = () => {
        if (meteorStopped) return
        const angle = gsap.utils.random(18, 34)
        const rad = (angle * Math.PI) / 180
        const dist = gsap.utils.random(280, 460)
        gsap.set(meteor, {
          top: `${gsap.utils.random(6, 36)}%`,
          left: `${gsap.utils.random(35, 88)}%`,
          rotation: -angle,
          x: 0,
          y: 0,
        })
        meteorTween = gsap
          .timeline({ onComplete: schedule })
          .to(
            meteor,
            {
              x: -Math.cos(rad) * dist,
              y: Math.sin(rad) * dist,
              duration: 1,
              ease: 'power2.out',
            },
            0,
          )
          .fromTo(meteor, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0)
          .to(meteor, { opacity: 0, duration: 0.45 }, 0.5)
      }
      const schedule = () => {
        if (meteorStopped) return
        meteorTween = gsap.delayedCall(gsap.utils.random(7, 15), launch)
      }
      meteorTween = gsap.delayedCall(gsap.utils.random(2.5, 5), launch)

      // ---- Pointer: tilt the map toward the cursor (desktop only) ----
      const mouse = q('.terrain-mouse')[0]
      const rx = gsap.quickTo(mouse, 'rotationX', {
        duration: 1.2,
        ease: 'power3',
      })
      const ry = gsap.quickTo(mouse, 'rotationY', {
        duration: 1.2,
        ease: 'power3',
      })
      const onMove = (e: PointerEvent) => {
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        ry(x * 10)
        rx(-y * 8)
      }
      if (window.matchMedia(FINE_POINTER).matches) {
        // Only listen while the hero is on screen; a page-lifetime pointermove
        // listener would keep tweening the invisible terrain from every section.
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (self.isActive) window.addEventListener('pointermove', onMove)
            else window.removeEventListener('pointermove', onMove)
          },
        })
      }
      return () => {
        // Tweens spawned from launch/schedule outlive the context; stop them here
        meteorStopped = true
        meteorTween?.kill()
        window.removeEventListener('pointermove', onMove)
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <header className="hero" id="top" ref={root}>
      <Terrain ref={terrain} />
      <span className="meteor" aria-hidden="true" />

      <div className="container hero-content">
        <p className="label hero-kicker">{site.kicker}</p>

        <h1 className="hero-name">
          <span className="hero-name-line">{site.firstName}</span>
          <span className="hero-name-line">
            {site.lastName}
            <span className="hero-frame" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero-subtitle">{site.subtitle}</p>
        <p className="hero-bio">{site.bio}</p>

        <div className="hero-ctas">
          <a
            className="btn btn-primary"
            href={site.ctas.primary.href}
            onClick={(e) => {
              e.preventDefault()
              scrollToHash(site.ctas.primary.href)
            }}
          >
            {site.ctas.primary.label}
            <span className="arrow" aria-hidden="true">
              ↓
            </span>
          </a>
          <a
            className="btn btn-ghost"
            href={site.ctas.secondary.href}
            target="_blank"
            rel="noreferrer"
          >
            {site.ctas.secondary.label}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      <div className="hero-scroll label" aria-hidden="true">
        <span className="hero-scroll-line" />
        Scroll
      </div>
    </header>
  )
}
