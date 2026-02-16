'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { ImageList } from './doc-components';
const photo7 = '/photos/7.jpg';

export default function DocDemo() {
  return (
    <PhotoProvider>
      <ImageList>
        <PhotoView src={photo7}>
          <img src={photo7} className="block w-32 h-32 object-cover" alt="" />
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  );
}
