'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { ImageList, Image } from './doc-components';
const photo5 = '/photos/5.jpg';

export default function DocDemo() {
  return (
    <PhotoProvider maskOpacity={0.5} bannerVisible={false}>
      <ImageList>
        <PhotoView src={photo5}>
          <Image src={photo5} />
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  );
}
