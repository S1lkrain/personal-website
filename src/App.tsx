import { useLayoutEffect } from 'react'
import About from './components/About'
import Contact, { Footer } from './components/Contact'
import Hero from './components/Hero'
import Leadership from './components/Leadership'
import Nav from './components/Nav'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import Stats from './components/Stats'
import { ScrollTrigger } from './lib/motion'
import { startSmoothScroll } from './lib/scroll'

export default function App() {
  useLayoutEffect(() => {
    const stop = startSmoothScroll()
    // Fonts change text metrics, so re-measure triggers once they load
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return stop
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <Hero />
      <main id="main">
        <About />
        <Stats />
        <Projects />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
