'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { ImageList } from './doc-components';
const photo6 = '/photos/6.jpg';

export default function DocDemo() {
  return (
    <PhotoProvider speed={() => 800}>
      <ImageList>
        <PhotoView src={photo6}>
          <img src={photo6} className="block w-32 h-32 md:w-64 md:h-64 object-cover" alt="" />
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  );
}
