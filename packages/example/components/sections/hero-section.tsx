'use client';

import { motion } from 'motion/react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { photoImages } from '@/components/doc-components';
import { fadeLeft, fadeRight } from '@/lib/animations';
import ReactIcon from '@/components/react-icon';

export default function HeroSection() {
  return (
    <section className="mesh-hero py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2 md:items-center">
        {/* Left — copy */}
        <motion.div className="text-center md:text-left" {...fadeLeft}>
          <p className="mb-3 flex items-center justify-center md:justify-start gap-1.5 text-sm font-medium text-emerald-600 tracking-wide uppercase">
            <ReactIcon className="text-lg text-[#61dafb]" />
            React photo viewer
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-[1.1]">
            Beautiful image previews in&nbsp;seconds.
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-md mx-auto md:mx-0">
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-semibold text-gray-800">
              awesome-photo-view
            </code>{' '}
            — the most beautiful, gesture-driven photo viewer for React. Smooth
            animations, pinch-to-zoom, swipe navigation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href="#get-started"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            >
              Get Started
            </a>
            <a
              href="https://github.com/ginzlabs/awesome-photo-view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Based on{' '}
            <a
              href="https://github.com/MinJieLiu/react-photo-view"
              className="underline hover:text-emerald-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              react-photo-view
            </a>{' '}
          </p>
        </motion.div>

        {/* Right — live photo grid */}
        <motion.div {...fadeRight}>
          <PhotoProvider>
            <div className="grid grid-cols-2 gap-3">
              {photoImages.slice(0, 4).map((src, i) => (
                <PhotoView key={i} src={src}>
                  <img
                    src={src}
                    alt=""
                    className={`w-full cursor-pointer rounded-xl object-cover shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition-shadow ${
                      i < 2 ? 'h-48 md:h-56' : 'h-40 md:h-48'
                    }`}
                  />
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        </motion.div>
      </div>
    </section>
  );
}
