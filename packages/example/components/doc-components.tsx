'use client';

import React, { PropsWithChildren } from 'react';

export const photoImages = [
  '/photos/1.jpg',
  '/photos/2.jpg',
  '/photos/3.jpg',
  '/photos/4.jpg',
  '/photos/5.jpg',
  '/photos/6.jpg',
  '/photos/7.jpg',
  '/photos/8.jpg',
  '/photos/9.jpg',
  '/photos/10.jpg',
  '/photos/11.jpg',
  '/photos/12.jpg',
  '/photos/13.jpg',
  '/photos/14.jpg',
];

// Subsets for specific demo sections
export const toolbarImages = ['/photos/8.jpg', '/photos/9.jpg', '/photos/10.jpg'];
export const overlayImages = ['/photos/11.jpg', '/photos/12.jpg', '/photos/13.jpg'];

export const ImageList = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-wrap items-center my-6">{children}</div>;
};

export const Image = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ src, ...props }, ref) => {
    return <img ref={ref} src={src} className="mr-2 mb-2 w-24 h-24 cursor-pointer object-cover rounded-xl shadow-lg shadow-black/10" alt="" {...props} />;
  },
);

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  primary?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(({ primary, className = '', ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`px-4 py-2 mr-2 rounded-md focus:outline-none cursor-pointer select-none ${
        primary
          ? 'bg-sky-600 text-white hover:bg-sky-700'
          : 'border border-gray-300 hover:text-white hover:bg-sky-500 hover:border-sky-500'
      } ${className}`}
    />
  );
});

export const Overlay = ({ children }: PropsWithChildren) => {
  return (
    <div className="absolute left-0 bottom-0 p-2 w-full min-h-24 text-sm text-slate-300 z-50 bg-black/50">
      {children}
    </div>
  );
};
