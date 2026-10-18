import { useState } from 'react'
import { PALETTES, getPalette, setPalette, type PaletteId } from '../lib/theme'
import './PalettePicker.css'

/** Dev-only panel for choosing a color palette. Not included in production builds. */
export default function PalettePicker() {
  const [current, setCurrent] = useState<PaletteId>(getPalette)
  const [open, setOpen] = useState(() => window.innerWidth > 760)

  return (
    <div className={`palette-picker${open ? '' : ' is-closed'}`}>
      <button
        className="pp-toggle"
        type="button"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Hide' : 'Palettes'}
      </button>
      {open && (
        <>
          <p className="pp-title">Palette · 7 : 2 : 1</p>
          <ul>
            {PALETTES.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={`pp-option${current === p.id ? ' is-current' : ''}`}
                  onClick={() => {
                    setPalette(p.id)
                    setCurrent(p.id)
                  }}
                >
                  <span className="pp-swatch">
                    <span style={{ background: p.colors[0], flex: 7 }} />
                    <span style={{ background: p.colors[1], flex: 2 }} />
                    <span style={{ background: p.colors[2], flex: 1 }} />
                  </span>
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
