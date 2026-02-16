'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { fadeUp } from '@/lib/animations';
import CodeBlock from '@/components/code-block';

const usageCode = `import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import 'awesome-photo-view/dist/awesome-photo-view.css';

export default function Gallery() {
  return (
    <PhotoProvider>
      {images.map((src, i) => (
        <PhotoView key={i} src={src}>
          <img src={src} alt="" />
        </PhotoView>
      ))}
    </PhotoProvider>
  );
}`;

export default function GetStartedSection() {
  return (
    <section id="get-started" className="mesh-soft py-20 md:py-24 scroll-mt-16">
      <motion.div className="mx-auto max-w-6xl px-4" {...fadeUp}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get Started
          </h2>
          <p className="mt-3 text-gray-500 text-lg">Up and running in under a minute.</p>
        </div>

        {/* Install commands */}
        <div className="mx-auto max-w-2xl space-y-3 mb-10">
          <CodeBlock code="pnpm add awesome-photo-view" />
          <CodeBlock code="yarn add awesome-photo-view" />
          <CodeBlock code="npm install awesome-photo-view" />
        </div>

        {/* Usage example */}
        <div className="mx-auto max-w-2xl mb-10">
          <p className="text-gray-500 mb-3 text-center md:text-left">Import the CSS and wrap your images:</p>
          <CodeBlock code={usageCode} />
        </div>

        {/* API link + llms.txt */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/api"
            className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Full API Reference &rarr;
          </Link>
          <a
            href="/llms.txt"
            download
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
            llms.txt
          </a>
        </div>
      </motion.div>
    </section>
  );
}
