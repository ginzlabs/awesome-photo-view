'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { ImageList } from './doc-components';
const photo2 = '/photos/2.jpg';
const photo3 = '/photos/3.jpg';
const photo4 = '/photos/4.jpg';

export default function DocDemo() {
  return (
    <PhotoProvider>
      <ImageList>
        <div className="m-2">
          <PhotoView src={photo4}>
            <img src={photo4} className="h-72" alt="" />
          </PhotoView>
        </div>

        <div className="flex flex-col">
          <PhotoView src={photo2}>
            <img src={photo2} className="m-2 h-36" alt="" />
          </PhotoView>

          <PhotoView src={photo3}>
            <img src={photo3} className="m-2 h-32" alt="" />
          </PhotoView>
        </div>
      </ImageList>
    </PhotoProvider>
  );
}
