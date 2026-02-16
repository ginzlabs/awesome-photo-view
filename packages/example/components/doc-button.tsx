'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { Button, ImageList } from './doc-components';
const photo4 = '/photos/4.jpg';

export default function DocDemo() {
  return (
    <PhotoProvider>
      <ImageList>
        <PhotoView src={photo4}>
          <Button primary>Try</Button>
        </PhotoView>
      </ImageList>
    </PhotoProvider>
  );
}
