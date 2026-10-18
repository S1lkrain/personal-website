import { useEffect, useState } from 'react'
import { site } from '../content/site'
import { ScrollTrigger } from '../lib/motion'
import { scrollToHash } from '../lib/scroll'
import { getTheme, setTheme, type Theme } from '../lib/theme'
import './Nav.css'

export default function Nav() {
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setThemeState] = useState<Theme>(getTheme)

  useEffect(() => {
    const triggers = site.nav.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(id),
        onLeaveBack: () => id === site.nav[0].id && setActive(''),
      }),
    )
    const bar = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setScrolled(self.scroll() > 40)
        setHidden(
          self.direction === 1 && self.scroll() > window.innerHeight * 0.8,
        )
      },
    })
    return () => {
      triggers.forEach((t) => t.kill())
      bar.kill()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToHash(hash)
  }

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
  }

  return (
    <nav
      className={`nav${hidden && !open ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
      aria-label="Main"
    >
      <div className="container nav-inner">
        <a
          className="nav-logo"
          href="#top"
          onClick={go('#top')}
          aria-label="Back to top"
        >
          {site.initials}
        </a>

        <ul className="nav-links" id="nav-links">
          {site.nav.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={go(`#${id}`)}
                aria-current={active === id ? 'true' : undefined}
                className={active === id ? 'is-active' : undefined}
              >
                <span className="nav-num">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="theme-toggle-icon" data-theme={theme} />
          </button>
          <button
            className="nav-menu"
            type="button"
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="nav-menu-bar" />
            <span className="nav-menu-bar" />
          </button>
        </div>
      </div>
    </nav>
  )
}
