'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { ImageList, Image } from './doc-components';
const photo2 = '/photos/2.jpg';

export default function DocDemo() {
  return (
    <PhotoProvider maskOpacity={0.5}>
      <ImageList>
        <PhotoView src={photo2}>
          <Image src={photo2} />
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  );
}
