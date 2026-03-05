import { useState, useEffect, useRef, useCallback } from 'react'

const HIDE_DELAY_MS = 3000

export default function HUD({ isPlaying, speed, onToggle, onReset, onSpeedChange }) {
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)

  const scheduleHide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS)
  }, [])

  const show = useCallback(() => {
    setVisible(true)
    scheduleHide()
  }, [scheduleHide])

  // Auto-hide on mount, reappear on mouse move / touch
  useEffect(() => {
    scheduleHide()

    window.addEventListener('mousemove', show)
    window.addEventListener('touchstart', show)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener('mousemove', show)
      window.removeEventListener('touchstart', show)
    }
  }, [show, scheduleHide])

  // Keep visible while interacting with HUD itself
  const handleHudInteraction = () => show()

  return (
    <div
      className={`
        absolute bottom-8 left-1/2 -translate-x-1/2 z-50
        transition-opacity duration-500
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onMouseMove={handleHudInteraction}
    >
      <div className="flex items-center gap-3 md:gap-5 bg-black/80 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 md:px-7 md:py-4 shadow-2xl">
        {/* Reset */}
        <button
          onClick={onReset}
          title="Reset to top (R)"
          className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors group"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
          </svg>
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">Reset</span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10" />

        {/* Play / Pause */}
        <button
          onClick={onToggle}
          title="Play / Pause (Space)"
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all shadow-lg"
        >
          {isPlaying ? (
            /* Pause icon */
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10" />

        {/* Speed control */}
        <div className="flex flex-col gap-2 w-28 md:w-40">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50 uppercase tracking-wider">Speed</span>
            <span className="text-sm font-semibold text-white tabular-nums">{speed}/10</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full accent-white h-1"
          />
          <div className="flex justify-between text-xs text-white/30">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
      </div>
    </div>
  )
}
