'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import { Button, ImageList } from './doc-components';
import { EosIconsBubbleLoading } from '../icons/EosIconsBubbleLoading';
const defaultPhoto = '/photos/default-photo.svg';

export default function DocDemo() {
  return (
    <ImageList>
      <PhotoProvider
        loadingElement={<EosIconsBubbleLoading className="text-white w-8 h-8" />}
        brokenElement={<img className="w-32 h-32" src={defaultPhoto} alt="" />}
      >
        <PhotoView src="/error.png">
          <Button>Try</Button>
        </PhotoView>
      </PhotoProvider>
    </ImageList>
  );
}
