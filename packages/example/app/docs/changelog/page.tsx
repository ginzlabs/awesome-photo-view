import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
};

export default function ChangelogPage() {
  return (
    <div className="prose prose-gray max-w-none">
      <h1>Changelog</h1>

      <p>
        <code>awesome-photo-view</code> is a maintained fork of{' '}
        <a href="https://github.com/MinJieLiu/react-photo-view" target="_blank" rel="noopener noreferrer">
          react-photo-view
        </a>{' '}
        (originally by MinJieLiu). For the original project&apos;s version history, see the{' '}
        <a href="https://github.com/MinJieLiu/react-photo-view/releases" target="_blank" rel="noopener noreferrer">
          original releases
        </a>.
      </p>

      <h2>1.3.0</h2>
      <p>Initial release of <code>awesome-photo-view</code>, forked from <code>react-photo-view</code> v1.2.7.</p>
      <ul>
        <li>Upgraded to React 19 and React DOM 19</li>
        <li>Upgraded to TypeScript 5</li>
        <li>Replaced microbundle with tsup for library builds</li>
        <li>Migrated documentation site from Nextra to a plain Next.js 16 App Router site</li>
        <li>Replaced Tailwind CSS v3 with v4</li>
        <li>Translated all source code comments from Chinese to English</li>
        <li>Removed all Chinese-language documentation; English only</li>
        <li>Updated Husky to v9, modernized lint-staged configuration</li>
        <li>Replaced unmaintained ESLint preset with direct config</li>
        <li>Renamed package to <code>awesome-photo-view</code></li>
      </ul>
    </div>
  );
}
