'use client';

import React from 'react';
import { motion } from 'motion/react';
import { fadeLeft, fadeRight } from '@/lib/animations';

import DocMotion from '@/components/doc-motion';
import DocToolbar from '@/components/doc-toolbar';
import DocOverlay from '@/components/doc-overlay';

/* ------------------------------------------------------------------ */
/*  Reusable showcase layout                                          */
/* ------------------------------------------------------------------ */

interface ShowcaseProps {
  title: string;
  description: React.ReactNode;
  demo: React.ReactNode;
  reversed?: boolean;
  className?: string;
}

function Showcase({ title, description, demo, reversed, className }: ShowcaseProps) {
  return (
    <section className={`py-20 md:py-24 ${className ?? ''}`}>
      <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2 md:items-center">
        <motion.div className={reversed ? 'order-2 md:order-1' : undefined} {...fadeLeft}>
          {reversed ? demo : (
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
              <p className="mt-4 text-gray-500 leading-relaxed">{description}</p>
            </div>
          )}
        </motion.div>

        <motion.div className={reversed ? 'order-1 md:order-2' : undefined} {...fadeRight}>
          {reversed ? (
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
              <p className="mt-4 text-gray-500 leading-relaxed">{description}</p>
            </div>
          ) : demo}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Four feature showcases                                            */
/* ------------------------------------------------------------------ */

export default function FeatureSections() {
  return (
    <>
      <Showcase
        title="Smooth Animations"
        description="CSS3 transitions for buttery-smooth open/close effects, plus spring physics for native-like momentum scrolling. Customize speed and easing per animation type."
        demo={<DocMotion />}
        className="mesh-soft"
      />

      <Showcase
        title="Custom Toolbar"
        description={
          <>
            Build your own toolbar with rotation, zoom, fullscreen, and any
            custom action. The{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">toolbarRender</code>{' '}
            prop gives you full control.
          </>
        }
        demo={<DocToolbar />}
        reversed
        className="bg-emerald-50/40"
      />

      <Showcase
        title="Custom Overlays"
        description="Add rich overlay content like descriptions, metadata, or controls on top of the viewer. Full access to rotation, scale, and index state."
        demo={<DocOverlay />}
        className="mesh-soft"
      />
    </>
  );
}
