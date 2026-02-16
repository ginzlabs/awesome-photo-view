'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { href: '/#get-started', label: 'Getting Started' },
  { href: '/docs/api', label: 'API' },
  { href: '/docs/changelog', label: 'Changelog' },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 hidden w-56 shrink-0 self-start md:block">
      <nav className="py-8 pr-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Documentation</h3>
        <ul className="space-y-1">
          {sidebarLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                  pathname === link.href
                    ? 'bg-emerald-50 font-medium text-emerald-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-5xl px-4">
      <Sidebar />
      <article className="min-w-0 flex-1 py-8 md:pl-8">{children}</article>
    </div>
  );
}
