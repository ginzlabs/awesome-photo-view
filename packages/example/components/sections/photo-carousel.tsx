'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { photoImages } from '@/components/doc-components';
import { fadeUp } from '@/lib/animations';

const GAP = 16;

export default function PhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [dragConstraint, setDragConstraint] = useState(0);
  const isDragging = useRef(false);
  const x = useMotionValue(0);

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;
      const overflow = track.scrollWidth - container.clientWidth;
      setDragConstraint(Math.max(0, overflow));
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current;
    const track = trackRef.current;
    const img = imageRefs.current[index];
    if (!container || !track || !img) return;

    const containerWidth = container.clientWidth;
    const trackLeft = track.getBoundingClientRect().left;
    const imgRect = img.getBoundingClientRect();
    const imgCenter = imgRect.left - trackLeft + imgRect.width / 2;
    const maxScroll = track.scrollWidth - containerWidth;

    let target = -(imgCenter - containerWidth / 2);
    target = Math.max(-maxScroll, Math.min(0, target));

    animate(x, target, { type: 'spring', stiffness: 300, damping: 30 });
  }, [x]);

  const handleIndexChange = useCallback((index: number) => {
    scrollToIndex(index);
  }, [scrollToIndex]);

  return (
    <section className="py-10">
      <motion.div {...fadeUp}>
        <PhotoProvider onIndexChange={handleIndexChange}>
          <div
            ref={containerRef}
            style={{ overflowX: 'clip', overflowY: 'visible' }}
          >
            <motion.div
              ref={trackRef}
              className="flex py-6"
              style={{ gap: GAP, cursor: 'grab', x }}
              drag="x"
              dragConstraints={{ left: -dragConstraint, right: 0 }}
              dragElastic={0.08}
              dragTransition={{
                power: 0.35,
                timeConstant: 180,
                bounceStiffness: 400,
                bounceDamping: 45,
              }}
              onDragStart={() => { isDragging.current = true; }}
              onDragEnd={() => {
                requestAnimationFrame(() => { isDragging.current = false; });
              }}
              onClickCapture={handleClickCapture}
              whileDrag={{ cursor: 'grabbing' }}
            >
              {/* Left spacer — matches the gap width */}
              <div className="shrink-0" style={{ width: GAP }} aria-hidden="true" />
              {photoImages.map((src, i) => (
                <PhotoView key={i} src={src}>
                  <motion.img
                    ref={(el) => { imageRefs.current[i] = el; }}
                    src={src}
                    alt=""
                    className="h-48 w-auto shrink-0 rounded-xl object-cover shadow-lg shadow-black/10 transition-shadow hover:shadow-xl hover:shadow-black/15"
                    style={{ cursor: 'pointer' }}
                    draggable={false}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                </PhotoView>
              ))}
              {/* Right spacer — matches the gap width */}
              <div className="shrink-0" style={{ width: GAP }} aria-hidden="true" />
            </motion.div>
          </div>
        </PhotoProvider>
      </motion.div>
    </section>
  );
}
