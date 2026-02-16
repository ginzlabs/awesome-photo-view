'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
const photo5 = '/photos/5.jpg';
const photo14 = '/photos/14.jpg';

export default function DocDemo() {
  return (
    <PhotoProvider
      speed={() => 800}
      easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
    >
      <div>
        <PhotoView src={photo5}>
          <img
            src={photo5}
            className="w-full max-w-sm h-auto rounded-xl shadow-lg shadow-black/10 cursor-pointer object-cover"
            alt=""
          />
        </PhotoView>
        <PhotoView src={photo14} />
      </div>
    </PhotoProvider>
  );
}
