import { useRef } from 'react'
import mammoth from 'mammoth'

const SAMPLE_TEXT = `# Welkom

Welcome to Autocue — your professional teleprompter.

Replace this placeholder with your own script, or import a .txt or .docx file using the buttons above.

# Tips

• Start a line with # to mark it as a section header — it appears smaller and blue during playback.

• Keep sentences short and direct so they are easy to read at a glance.

• Add blank lines between paragraphs to give yourself a natural pause.

• Use a font size that is comfortable for your shooting distance. For a camera one metre away, 48–64 px works well.

• Start at a slow speed and increase it as you gain confidence.

When you are ready, press the Start Recording button in the top right. Good luck with your recording!`

const MOBILE_TIPS = [
  ['Tik', 'Play / Pause'],
  ['Scroll omhoog/omlaag', 'Positie aanpassen tijdens pauze'],
  ['Veeg omhoog (HUD)', 'Snelheid verhogen'],
  ['Veeg omlaag (HUD)', 'Snelheid verlagen'],
  ['Reset-knop', 'Terug naar begin'],
]

export default function Editor({ text, setText, fontSize, setFontSize, speed, setSpeed, onStart }) {
  const txtInputRef = useRef(null)
  const docxInputRef = useRef(null)

  const handleTxtImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setText(ev.target.result)
    reader.readAsText(file, 'UTF-8')
    e.target.value = ''
  }

  const handleDocxImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.extractRawText({ arrayBuffer })
      setText(result.value.trim())
    } catch (err) {
      console.error('Failed to parse .docx:', err)
      alert('Could not read this .docx file. Please try a different file.')
    }
    e.target.value = ''
  }

  const canStart = text.trim().length > 0

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="border-b border-gray-800/60 px-4 py-4 md:px-8 md:py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Clapperboard-style icon */}
            <div className="w-9 h-9 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" />
                <polyline points="17 2 12 7 7 2" />
                <line x1="2" y1="7" x2="22" y2="7" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold tracking-tight leading-none">Autocue</h1>
              <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">CU Leeuwarden</p>
            </div>
          </div>

          <button
            onClick={onStart}
            disabled={!canStart}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 md:px-6 bg-white text-gray-950 font-semibold rounded-xl hover:bg-gray-100 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            <span className="hidden sm:inline">Start Recording</span>
            <span className="sm:hidden">Start</span>
          </button>
        </div>
      </header>

      {/* ── Main layout ────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-5 md:px-8 md:py-8 flex flex-col md:flex-row gap-5 md:gap-8">
        {/* Left column: script textarea */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Script</h2>
            <div className="flex items-center gap-2">
              {/* Hidden file inputs */}
              <input ref={txtInputRef} type="file" accept=".txt,text/plain" className="hidden" onChange={handleTxtImport} />
              <input ref={docxInputRef} type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={handleDocxImport} />

              <button
                onClick={() => txtInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-700 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Import .txt
              </button>
              <button
                onClick={() => docxInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-700 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Import .docx
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your script here…"
            spellCheck
            className="flex-1 min-h-[300px] md:min-h-[480px] bg-gray-900 border border-gray-800 rounded-xl p-5 text-gray-100 text-base leading-relaxed resize-none focus:outline-none focus:border-gray-600 placeholder-gray-700 font-mono transition-colors"
          />

          <p className="text-xs text-gray-600 text-right">
            {text.trim().length === 0 ? 'No script yet' : `${text.split(/\s+/).filter(Boolean).length} words`}
          </p>
        </div>

        {/* Right column: settings */}
        <div className="w-full md:w-72 md:shrink-0 flex flex-col gap-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</h2>

          {/* Font size */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Font Size</span>
              <span className="text-sm font-mono text-gray-400">{fontSize}px</span>
            </div>
            <input
              type="range"
              min={24}
              max={96}
              step={2}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-white"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1.5">
              <span>24px</span>
              <span>96px</span>
            </div>
          </div>

          {/* Scroll speed */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Scroll Speed</span>
              <span className="text-sm font-mono text-gray-400">{speed}/10</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-white"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1.5">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Live text preview */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 overflow-hidden">
            <span className="text-xs text-gray-500 block mb-3 uppercase tracking-wider">Preview</span>
            <div style={{ overflow: 'hidden', maxHeight: '4.5em' }}>
              <p
                className="text-white"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.8,
                  fontFamily: '"Georgia", "Times New Roman", serif',
                  margin: 0,
                }}
              >
                Voorbeeld tekst.
              </p>
            </div>
          </div>

          {/* Mobile tips */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <span className="text-xs text-gray-500 block mb-3 uppercase tracking-wider">Bediening</span>
            <div className="space-y-2.5">
              {MOBILE_TIPS.map(([gesture, action]) => (
                <div key={gesture} className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-xs text-gray-300 font-medium">{gesture}</span>
                  <span className="text-xs text-gray-500 text-right">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
