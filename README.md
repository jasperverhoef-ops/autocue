# Autocue — Professional Teleprompter

A clean, fullscreen teleprompter web app built with React + Vite + Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. **Paste or type** your script into the textarea, or import a `.txt` / `.docx` file.
2. Adjust **Font Size** and **Scroll Speed** in the Settings panel on the right.
3. Click **Start Recording** — the app enters fullscreen and the teleprompter begins.
4. Use the floating HUD at the bottom to play/pause, change speed, or reset.
5. Press **Esc** (or the browser back gesture) to exit back to the editor.

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `↑` | Speed +1 |
| `↓` | Speed −1 |
| `R` | Reset to top |
| `Esc` | Exit teleprompter (exits fullscreen) |

## Features

- **Text import** — paste text, import `.txt`, or import `.docx` (via mammoth.js)
- **Fullscreen playback** — uses the Fullscreen API for distraction-free recording
- **Smooth scroll** — `requestAnimationFrame` loop for precise, jank-free movement
- **Speed range** — 1–10 maps to ~20–200 px/s internally
- **Reading-zone overlay** — gradient dims text above and below the focal band
- **HUD auto-hide** — controls fade after 3 s of inactivity, reappear on mouse move
- **Font size** — adjustable from 24 px to 96 px

## File structure

```
src/
  App.jsx          # root — mode switching (edit | play)
  Editor.jsx       # script input, file import, settings
  Teleprompter.jsx # fullscreen scroll view + reading-zone overlay
  HUD.jsx          # floating controls overlay with auto-hide
  useScroller.js   # custom hook: requestAnimationFrame scroll logic
  main.jsx         # React entry point
  index.css        # Tailwind directives + scrollbar helpers
index.html
```
