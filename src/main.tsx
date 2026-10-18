import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource/jetbrains-mono/400.css'
import 'lenis/dist/lenis.css'
import App from './App'
import './index.css'

// Text is split into animated pieces on mount, so wait for the web fonts first;
// otherwise the pieces are measured with fallback-font widths.
const fontsReady = Promise.allSettled([
  document.fonts.load('600 1em "Fraunces Variable"'),
  document.fonts.load('400 1em "Inter Variable"'),
  document.fonts.load('400 1em "JetBrains Mono"'),
])
const timeout = new Promise((resolve) => setTimeout(resolve, 2000))

Promise.race([fontsReady, timeout]).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
