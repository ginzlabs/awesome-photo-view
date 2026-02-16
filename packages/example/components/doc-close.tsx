'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { ImageList, Image } from './doc-components';
const photo4 = '/photos/4.jpg';

export default function DocDemo() {
  return (
    <PhotoProvider pullClosable={false} maskClosable={false} maskOpacity={null}>
      <ImageList>
        <PhotoView src={photo4}>
          <Image src={photo4} />
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  );
}
