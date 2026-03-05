import { useState, useRef, useCallback, useEffect } from 'react'

// Maps speed 1–10 to px/second (20–200)
function speedToPxPerSec(speed) {
  return 20 + ((speed - 1) / 9) * 180
}

export function useScroller(containerRef) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeedState] = useState(5)

  const isPlayingRef = useRef(false)
  const speedRef = useRef(5)
  const scrollYRef = useRef(0)
  const lastTimestampRef = useRef(null)
  const rafRef = useRef(null)

  const tick = useCallback(
    (timestamp) => {
      if (!isPlayingRef.current) return

      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp
      }

      const deltaSec = (timestamp - lastTimestampRef.current) / 1000
      lastTimestampRef.current = timestamp

      const container = containerRef.current
      if (container) {
        const maxScroll = container.scrollHeight - container.clientHeight
        const next = Math.min(
          scrollYRef.current + speedToPxPerSec(speedRef.current) * deltaSec,
          maxScroll,
        )
        scrollYRef.current = next
        container.scrollTop = next

        // Stop automatically at the end
        if (next >= maxScroll) {
          isPlayingRef.current = false
          setIsPlaying(false)
          return
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    },
    [containerRef],
  )

  const play = useCallback(() => {
    if (isPlayingRef.current) return
    // Sync with actual scroll position so manual scrolling while paused is respected
    if (containerRef.current) {
      scrollYRef.current = containerRef.current.scrollTop
    }
    isPlayingRef.current = true
    setIsPlaying(true)
    lastTimestampRef.current = null
    rafRef.current = requestAnimationFrame(tick)
  }, [tick, containerRef])

  const pause = useCallback(() => {
    isPlayingRef.current = false
    setIsPlaying(false)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const toggle = useCallback(() => {
    if (isPlayingRef.current) pause()
    else play()
  }, [play, pause])

  const reset = useCallback(() => {
    pause()
    scrollYRef.current = 0
    if (containerRef.current) containerRef.current.scrollTop = 0
  }, [pause, containerRef])

  const setSpeed = useCallback((newSpeed) => {
    const clamped = Math.max(1, Math.min(10, newSpeed))
    speedRef.current = clamped
    setSpeedState(clamped)
  }, [])

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { isPlaying, speed, toggle, play, pause, reset, setSpeed }
}
