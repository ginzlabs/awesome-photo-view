import React from 'react';
import { createPortal } from 'react-dom';
import './SlidePortal.less';

export interface ISliderPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: HTMLElement;
}

function SlidePortal({ container, ...rest }: ISliderPortalProps) {
  const target = container ?? document.body;
  return createPortal(<div {...rest} />, target);
}

export default SlidePortal;
