export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e8e2d8', background: '#f5f0e8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-stone-400">
          <span>🌮</span>
          <span>© 2026 NachoTest</span>
          <span className="text-stone-300">·</span>
          <span>De ultieme nacho-gids van Nederland</span>
        </div>
        <div className="flex gap-4 text-xs text-stone-400">
          <a href="#" className="hover:text-amber-700 transition-colors">
            Over NachoTest
          </a>
          <a href="#" className="hover:text-amber-700 transition-colors">
            Contact
          </a>
          <a href="#" className="hover:text-amber-700 transition-colors">
            Restaurant toevoegen
          </a>
        </div>
      </div>
    </footer>
  );
}
