'use client';

import { useCallback } from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { photoImages } from '@/components/doc-components';
import { fadeUp } from '@/lib/animations';

export default function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
    duration: 30,
  });

  const scrollToIndex = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  return (
    <section className="py-10">
      <motion.div {...fadeUp}>
        <PhotoProvider onIndexChange={scrollToIndex}>
          <div
            ref={emblaRef}
            style={{ overflowX: 'clip', overflowY: 'visible' }}
          >
            <div className="flex gap-4 py-6 px-4">
              {photoImages.map((src, i) => (
                <div key={i} className="shrink-0">
                  <PhotoView src={src}>
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      className="h-48 w-auto rounded-xl object-cover shadow-lg shadow-black/10 transition duration-200 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-black/15 cursor-pointer"
                    />
                  </PhotoView>
                </div>
              ))}
            </div>
          </div>
        </PhotoProvider>
      </motion.div>
    </section>
  );
}
