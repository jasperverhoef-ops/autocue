import { useRef, useEffect } from 'react'
import { useScroller } from './useScroller'
import HUD from './HUD'

export default function Teleprompter({ text, fontSize, initialSpeed, onExit }) {
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)

  const { isPlaying, speed, toggle, reset, setSpeed } = useScroller(containerRef)

  // Keep a ref to current speed so keyboard handler never captures a stale value
  const speedRef = useRef(initialSpeed)
  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  // ── Fullscreen ────────────────────────────────────────────
  const onExitRef = useRef(onExit)
  useEffect(() => {
    onExitRef.current = onExit
  }, [onExit])

  useEffect(() => {
    const el = wrapperRef.current
    if (el?.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        // Fullscreen unavailable (e.g. iframe) — continue in windowed mode
      })
    }

    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        onExitRef.current()
      }
    }
    document.addEventListener('fullscreenchange', handleFsChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange)
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }, []) // intentionally run once on mount

  // ── Apply initial speed on mount ──────────────────────────
  useEffect(() => {
    setSpeed(initialSpeed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // only on mount

  // ── Keyboard shortcuts ────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case ' ':
          e.preventDefault()
          toggle()
          break
        case 'ArrowUp':
          e.preventDefault()
          setSpeed(Math.min(10, speedRef.current + 1))
          break
        case 'ArrowDown':
          e.preventDefault()
          setSpeed(Math.max(1, speedRef.current - 1))
          break
        case 'r':
        case 'R':
          reset()
          break
        // Escape is handled by the browser exiting fullscreen,
        // which triggers the fullscreenchange handler above.
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [toggle, reset, setSpeed])

  // ── Render ────────────────────────────────────────────────
  const lines = text.split('\n')

  return (
    <div
      ref={wrapperRef}
      className="relative w-screen h-screen bg-black overflow-hidden select-none"
    >
      {/* ── Scrollable text container ── */}
      <div
        ref={containerRef}
        className="no-scrollbar w-full h-full overflow-y-auto"
      >
        {/* Push text down so it enters from below the reading zone */}
        <div style={{ height: '60vh' }} aria-hidden="true" />

        <div
          className="mx-auto px-12 pb-4"
          style={{
            maxWidth: '920px',
            fontSize: `${fontSize}px`,
            lineHeight: 1.85,
            fontFamily: '"Georgia", "Times New Roman", serif',
            color: '#f0f0f0',
          }}
        >
          {lines.map((line, i) => {
            if (line.trim() === '') {
              return <div key={i} style={{ height: `${fontSize * 1.1}px` }} aria-hidden="true" />
            }
            if (line.startsWith('#')) {
              const heading = line.replace(/^#+\s*/, '')
              return (
                <p
                  key={i}
                  style={{
                    margin: 0,
                    marginTop: `${fontSize * 0.8}px`,
                    marginBottom: `${fontSize * 0.4}px`,
                    fontSize: `${fontSize * 0.7}px`,
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5b9bd5',
                  }}
                >
                  {heading}
                </p>
              )
            }
            return (
              <p key={i} style={{ margin: 0, marginBottom: `${fontSize * 0.35}px` }}>
                {line}
              </p>
            )
          })}
        </div>

        {/* Allow the last line to scroll all the way through the reading zone */}
        <div style={{ height: '60vh' }} aria-hidden="true" />
      </div>

      {/* ── Reading-zone overlay ── */}
      {/*
        Two gradient panels dim the text above and below the focal band.
        The centre ~26 % of the screen is left at full brightness.
        Thin hairlines at the transition points give a subtle guide mark.
      */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Top dim */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '37%',
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.0) 100%)',
          }}
        />
        {/* Bottom dim */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '37%',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.0) 100%)',
          }}
        />
        {/* Top guide hairline */}
        <div
          style={{
            position: 'absolute',
            top: '37%',
            left: '8%',
            right: '8%',
            height: '1px',
            background: 'rgba(255,255,255,0.10)',
          }}
        />
        {/* Bottom guide hairline */}
        <div
          style={{
            position: 'absolute',
            bottom: '37%',
            left: '8%',
            right: '8%',
            height: '1px',
            background: 'rgba(255,255,255,0.10)',
          }}
        />
      </div>

      {/* ── Floating HUD ── */}
      <HUD
        isPlaying={isPlaying}
        speed={speed}
        onToggle={toggle}
        onReset={reset}
        onSpeedChange={setSpeed}
      />
    </div>
  )
}
