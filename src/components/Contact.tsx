import { useLayoutEffect, useRef, useState } from 'react'
import { site } from '../content/site'
import { MOTION_OK, SplitText, gsap } from '../lib/motion'
import SectionHeader from './SectionHeader'
import './Contact.css'

function EmailRow({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard can be blocked; the mailto link still works.
    }
  }

  return (
    <li className="email-row">
      <a className="email-link" href={`mailto:${email}`}>
        {email}
      </a>
      <button
        className="copy-btn"
        type="button"
        onClick={copy}
        aria-live="polite"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </li>
  )
}

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el)
      const split = SplitText.create(q('.contact-heading'), {
        type: 'words,chars',
        mask: 'chars',
      })
      split.masks.forEach((m) => m.classList.add('split-mask'))
      gsap
        .timeline({
          scrollTrigger: {
            trigger: q('.contact-heading')[0],
            start: 'top 80%',
          },
        })
        .from(split.chars, {
          yPercent: 120,
          rotationZ: 8,
          duration: 1.1,
          stagger: 0.018,
          ease: 'expo.out',
        })
        .from(
          q('.contact-sub, .email-row, .contact-links'),
          {
            y: 24,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.4,
        )
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-title"
      ref={root}
    >
      <div className="container">
        <SectionHeader
          number="04"
          label="Contact"
          title="Get in Touch"
          id="contact-title"
        />

        <p className="contact-heading">{site.contact.heading}</p>
        <p className="contact-sub">{site.contact.sub}</p>

        <ul className="emails">
          {site.contact.emails.map((e) => (
            <EmailRow key={e} email={e} />
          ))}
        </ul>

        <div className="contact-links">
          {site.contact.links.map((l) => (
            <a
              key={l.href}
              className="btn btn-ghost"
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              {l.label}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {YEAR} {site.name}
        </span>
        <span>Built with React, TypeScript & GSAP</span>
      </div>
    </footer>
  )
}
