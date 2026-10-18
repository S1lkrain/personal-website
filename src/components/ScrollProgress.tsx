import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/motion'

/** Thin accent bar at the top of the page that tracks reading progress. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}
