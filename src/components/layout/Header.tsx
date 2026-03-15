import Link from 'next/link';

export default function Header() {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl shadow-sm"
      style={{ background: '#faf8f4ee', borderBottom: '1px solid #e8e2d8' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-xl" style={{ animation: 'float 3s ease infinite' }}>
            🌮
          </span>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Nacho<span className="text-amber-600">Test</span>
          </span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-stone-400">
          <a href="/#kaart" className="hover:text-amber-600 transition-colors">
            Kaart
          </a>
          <a href="/#top" className="hover:text-amber-600 transition-colors">
            Top Nacho&apos;s
          </a>
          <a href="/#alle" className="hover:text-amber-600 transition-colors">
            Alle Restaurants
          </a>
        </nav>
      </div>
    </header>
  );
}
