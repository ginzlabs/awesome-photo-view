'use client';

import React from 'react';
import { motion } from 'motion/react';
import { fadeUp } from '@/lib/animations';

import Icon1 from '@/icons/Icon1';
import Icon2 from '@/icons/Icon2';
import Icon3 from '@/icons/Icon3';
import Icon5 from '@/icons/Icon5';
import Icon6 from '@/icons/Icon6';
import Icon7 from '@/icons/Icon7';

interface Badge {
  label: string;
  bg: string;
  text: string;
  icon?: React.ReactNode;
}

const badges: Badge[] = [
  { label: 'Touch Gestures', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: <Icon1 /> },
  { label: 'Animated', bg: 'bg-violet-100', text: 'text-violet-700', icon: <Icon2 /> },
  { label: 'Adaptive', bg: 'bg-sky-100', text: 'text-sky-700', icon: <Icon3 /> },
  { label: 'Keyboard Navigation', bg: 'bg-blue-100', text: 'text-blue-700', icon: <Icon5 /> },
  { label: 'TypeScript', bg: 'bg-blue-100', text: 'text-blue-700', icon: <Icon6 /> },
  { label: 'Lightweight', bg: 'bg-amber-100', text: 'text-amber-700', icon: <Icon7 /> },
  { label: 'React 19', bg: 'bg-cyan-100', text: 'text-cyan-700' },
  { label: 'Next.js 16', bg: 'bg-slate-200', text: 'text-slate-700' },
];

export default function BadgesSection() {
  return (
    <section className="py-12">
      <motion.div
        className="mx-auto max-w-4xl px-4 flex flex-wrap items-center justify-center gap-2.5"
        {...fadeUp}
      >
        {badges.map((b) => (
          <span
            key={b.label}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ${b.bg} ${b.text}`}
          >
            {b.icon && <span className="text-base leading-none">{b.icon}</span>}
            {b.label}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
