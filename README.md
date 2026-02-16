# awesome-photo-view

[![npm version](https://img.shields.io/npm/v/awesome-photo-view.svg)](https://www.npmjs.com/package/awesome-photo-view)
[![npm downloads](https://img.shields.io/npm/dm/awesome-photo-view.svg)](https://www.npmjs.com/package/awesome-photo-view)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/awesome-photo-view)](https://bundlephobia.com/package/awesome-photo-view)
[![license](https://img.shields.io/npm/l/awesome-photo-view)](https://github.com/ginzlabs/awesome-photo-view/blob/main/LICENSE)

A modern photo viewer component for React. Touch gestures, smooth animations, pinch-to-zoom, swipe navigation. Based on [react-photo-view](https://github.com/MinJieLiu/react-photo-view).

https://github.com/user-attachments/assets/c2f1d6b0-fc68-4b0a-b426-0961f05d961a

## Features

- Touch gestures with drag, pan, and pinch-to-zoom
- Smooth open/close animations with spring physics
- Swipe navigation between images
- Keyboard navigation for desktop
- Custom toolbar, overlays, and triggers
- TypeScript, lightweight
- Simple API -- zero config to get started

## Install

```bash
pnpm add awesome-photo-view
```

## Usage

```js
import { PhotoProvider, PhotoView } from 'awesome-photo-view';
import 'awesome-photo-view/dist/awesome-photo-view.css';

function App() {
  return (
    <PhotoProvider>
      <PhotoView src="/1.jpg">
        <img src="/1-thumbnail.jpg" alt="" />
      </PhotoView>
    </PhotoProvider>
  );
}
```

## Documentation

- [Getting Started](https://awesome-photo-view.vercel.app/docs/getting-started)
- [API](https://awesome-photo-view.vercel.app/docs/api)
- [Changelog](https://awesome-photo-view.vercel.app/docs/changelog)

## License

Apache-2.0 -- [MinJieLiu](https://github.com/MinJieLiu), [Dmitriy Ginzburg](https://github.com/ginzlabs)
