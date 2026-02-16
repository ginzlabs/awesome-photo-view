'use client';

import React from 'react';
import { PhotoView, PhotoProvider } from 'awesome-photo-view';
import { overlayImages } from './doc-components';

export default function DocDemo() {
  return (
    <PhotoProvider
      overlayRender={({ rotate, onRotate, scale, onScale, overlay }) => {
        return (
          <>
            {/* Toolbar buttons — top-right, matching the default toolbar position */}
            <div className="absolute top-0 right-12 z-50 flex items-center gap-1 p-2">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                title="Rotate"
                onClick={() => onRotate(rotate + 90)}
              >
                <svg width="20" height="20" viewBox="0 0 768 768" fill="currentColor">
                  <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                title="Zoom in"
                onClick={() => onScale(scale + 0.5)}
              >
                <svg width="20" height="20" viewBox="0 0 768 768" fill="currentColor">
                  <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                title="Zoom out"
                onClick={() => onScale(scale - 0.5)}
              >
                <svg width="20" height="20" viewBox="0 0 768 768" fill="currentColor">
                  <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
                </svg>
              </button>
            </div>

            {/* Description — bottom */}
            {overlay && (
              <div className="absolute left-0 bottom-0 w-full p-3 bg-black/50 text-sm text-slate-300 z-50">
                {overlay}
              </div>
            )}
          </>
        );
      }}
    >
      <div className="grid grid-cols-3 gap-2">
        {overlayImages.map((item, index) => (
          <PhotoView key={index} src={item} overlay={<div>{item}</div>}>
            <img
              src={item}
              className="w-full aspect-square rounded-xl shadow-lg shadow-black/10 cursor-pointer object-cover"
              alt=""
            />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
