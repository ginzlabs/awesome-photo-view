'use client';

import { useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { photoImages } from '@/components/doc-components';
import { fadeUp } from '@/lib/animations';

const imgClass =
  'h-48 w-auto rounded-xl object-cover shadow-lg shadow-black/10 transition duration-200 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-black/15 cursor-pointer';

export default function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const mobileItemRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToIndex = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const mobileScrollToIndex = useCallback((index: number) => {
    mobileItemRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, []);

  return (
    <section className="py-2">
      <motion.div {...fadeUp}>
        {/* Desktop: Embla carousel (smooth drag + inertia, overflow-x: clip for shadows) */}
        <div className="hidden md:block">
          <PhotoProvider onIndexChange={scrollToIndex}>
            <div
              ref={emblaRef}
              style={{ overflowX: 'clip', overflowY: 'visible' }}
            >
              <div className="flex gap-4 py-6 px-4">
                {photoImages.map((src, i) => (
                  <div key={`desktop-${i}`} className="shrink-0">
                    <PhotoView src={src}>
                      <img src={src} alt="" loading="lazy" draggable={false} className={imgClass} />
                    </PhotoView>
                  </div>
                ))}
              </div>
            </div>
          </PhotoProvider>
        </div>

        {/* Mobile: native scroll (compositor-driven, zero JS in touch path) */}
        <div className="md:hidden">
          <PhotoProvider onIndexChange={mobileScrollToIndex}>
            <div className="overflow-x-auto -my-10 py-10 scrollbar-hide">
              <div className="flex gap-4 px-4 w-max">
                {photoImages.map((src, i) => (
                  <div
                    key={`mobile-${i}`}
                    ref={(el) => { mobileItemRefs.current[i] = el; }}
                    className="shrink-0"
                  >
                    <PhotoView src={src}>
                      <img src={src} alt="" loading="lazy" draggable={false} className={imgClass} />
                    </PhotoView>
                  </div>
                ))}
              </div>
            </div>
          </PhotoProvider>
        </div>
      </motion.div>
    </section>
  );
}
