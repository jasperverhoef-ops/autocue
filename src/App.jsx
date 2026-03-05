import { useState, useCallback } from 'react'
import Editor from './Editor'
import Teleprompter from './Teleprompter'
import SplashScreen from './SplashScreen'

const DEFAULT_TEXT = ''
const DEFAULT_FONT_SIZE = 52
const DEFAULT_SPEED = 4

export default function App() {
  const [splash, setSplash] = useState(true)
  const [mode, setMode] = useState('edit') // 'edit' | 'play'
  const [text, setText] = useState(DEFAULT_TEXT)
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)
  const [speed, setSpeed] = useState(DEFAULT_SPEED)

  const handleStart = useCallback(() => {
    if (text.trim()) setMode('play')
  }, [text])

  const handleExit = useCallback(() => {
    setMode('edit')
  }, [])

  if (splash) {
    return <SplashScreen onDone={() => setSplash(false)} />
  }

  if (mode === 'play') {
    return (
      <Teleprompter
        text={text}
        fontSize={fontSize}
        initialSpeed={speed}
        onExit={handleExit}
      />
    )
  }

  return (
    <Editor
      text={text}
      setText={setText}
      fontSize={fontSize}
      setFontSize={setFontSize}
      speed={speed}
      setSpeed={setSpeed}
      onStart={handleStart}
    />
  )
}
