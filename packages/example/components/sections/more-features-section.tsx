'use client';

import React from 'react';
import { motion } from 'motion/react';
import { fadeUp } from '@/lib/animations';

import DocBackdrop from '@/components/doc-backdrop';
import DocControlled from '@/components/doc-controlled';
import DocPart from '@/components/doc-part';
import DocButton from '@/components/doc-button';
import DocCover from '@/components/doc-cover';
import DocBroken from '@/components/doc-broken';
import DocPure from '@/components/doc-pure';

/* ------------------------------------------------------------------ */
/*  Card data                                                         */
/* ------------------------------------------------------------------ */

interface FeatureCard {
  emoji: string;
  title: string;
  description: string;
  demo: React.ReactNode;
}

const features: FeatureCard[] = [
  { emoji: '🔁', title: 'Loop Preview', description: 'Browse through all images in a seamless loop — no dead ends.', demo: <DocPart /> },
  { emoji: '🌑', title: 'Mask Opacity', description: 'Adjust backdrop transparency for the perfect overlay effect.', demo: <DocBackdrop /> },
  { emoji: '🎛️', title: 'Controlled Mode', description: 'Full programmatic control over visibility, index, and state.', demo: <DocControlled /> },
  { emoji: '🖱️', title: 'Custom Trigger', description: 'Use any element as the trigger — buttons, cards, anything.', demo: <DocButton /> },
  { emoji: '🖼️', title: 'Crop Thumbnails', description: 'Automatic crop-aware zoom animation for object-fit thumbnails.', demo: <DocCover /> },
  { emoji: '⚠️', title: 'Error Handling', description: 'Customizable broken-image and loading states out of the box.', demo: <DocBroken /> },
  { emoji: '👁️', title: 'Hide Banner', description: 'Option to hide the top navigation bar for a minimal look.', demo: <DocPure /> },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MoreFeaturesSection() {
  return (
    <section className="bg-slate-50/60 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div className="text-center mb-14" {...fadeUp}>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            More Features
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Everything you need, nothing you don&apos;t.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="mb-6 break-inside-avoid rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="text-2xl mb-2">{f.emoji}</div>
              <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{f.description}</p>
              <div className="mt-4 overflow-hidden">
                {f.demo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
