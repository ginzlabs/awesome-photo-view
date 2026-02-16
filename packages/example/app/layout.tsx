import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import '../../awesome-photo-view/dist/awesome-photo-view.css';

export const metadata: Metadata = {
  title: {
    default: 'awesome-photo-view',
    template: '%s - awesome-photo-view',
  },
  description: 'An exquisite React photo preview component',
};

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-center sm:justify-between px-4">
        <Link href="/" className="hidden sm:block text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors">
          awesome-photo-view
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="/#get-started" className="hover:text-emerald-600 transition-colors">
            Docs
          </a>
          <Link href="/docs/api" className="hover:text-emerald-600 transition-colors">
            API
          </Link>
          <Link href="/docs/changelog" className="hover:text-emerald-600 transition-colors">
            Changelog
          </Link>
          <a
            href="https://github.com/ginzlabs/awesome-photo-view"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
      <p>
        Apache-2.0 &copy; {new Date().getFullYear()}{' '}
        <a href="https://github.com/ginzlabs" className="hover:text-emerald-600" target="_blank" rel="noopener noreferrer">
          Dmitriy Ginzburg
        </a>
      </p>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
