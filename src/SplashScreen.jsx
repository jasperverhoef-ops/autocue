import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Start fade-out after 1.8s, call onDone after the transition finishes
    const fadeTimer = setTimeout(() => setFading(true), 1800)
    const doneTimer = setTimeout(() => onDone(), 2400)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
      style={{
        background: '#003DA5',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <img
        src="logo.svg"
        alt="ChristenUnie Leeuwarden"
        style={{ maxWidth: '260px', width: '60vw' }}
      />
      <p
        style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: '1rem',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Autocue
      </p>
    </div>
  )
}
