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

/**
 * Locks page scrolling (e.g. behind the mobile menu). `body { overflow: hidden }`
 * would not work here: html has `overflow-x: clip`, which stops body overflow
 * from propagating to the viewport — and Lenis scrolls programmatically anyway.
 */
export function setScrollLock(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (locked) {
    lenis?.stop()
  } else {
    lenis?.start()
  }
}

export function scrollToHash(hash: string) {
  const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash)
  if (target === null) return
  if (lenis) {
    // force: the menu's scroll lock may not have lifted yet when a menu link is clicked
    lenis.scrollTo(target, { duration: 1.4, force: true })
  } else {
    const top = typeof target === 'number' ? target : target.offsetTop
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }
  if (typeof target !== 'number') {
    // Move keyboard/screen-reader focus along with the visual scroll
    target.tabIndex = -1
    target.focus({ preventScroll: true })
  }
  history.replaceState(null, '', hash === '#top' ? location.pathname : hash)
}
