import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

let lenis: Lenis | null = null

/** Smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {}

  lenis = new Lenis({ lerp: 0.09 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToHash(hash: string) {
  const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash)
  if (target === null) return
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 })
  } else {
    const top = typeof target === 'number' ? target : target.offsetTop
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }
  history.replaceState(null, '', hash === '#top' ? location.pathname : hash)
}
