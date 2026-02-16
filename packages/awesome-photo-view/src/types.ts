import type React from 'react';

/**
 * Resource data type
 */
export interface DataType {
  /**
   * Unique identifier
   */
  key: number | string;
  /**
   * Resource URL
   */
  src?: string;
  /**
   * Custom render function, lower priority than src
   */
  render?: (props: PhotoRenderParams) => React.ReactNode;
  /**
   * Custom overlay node
   */
  overlay?: React.ReactNode;
  /**
   * Specify render node width
   */
  width?: number;
  /**
   * Specify render node height
   */
  height?: number;
  /**
   * Trigger ref
   */
  originRef?: React.MutableRefObject<HTMLElement | null>;
}

export interface PhotoProviderBase {
  /**
   * Whether to enable loop preview; enabled when image count exceeds this number
   * @defaultValue 3
   */
  loop?: boolean | number;
  /**
   * Animation speed
   * @defaultValue 400
   */
  speed?: (type: ActiveAnimationType) => number;
  /**
   * Easing function
   * @defaultValue 'cubic-bezier(0.25, 0.8, 0.25, 1)'
   */
  easing?: (type: ActiveAnimationType) => string;
  /**
   * Whether clicking the photo can close the viewer
   */
  photoClosable?: boolean;
  /**
   * Whether clicking the backdrop can close the viewer
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * Default backdrop opacity
   * Set to null to disable backdrop opacity changes on pull-down
   * @defaultValue 1
   */
  maskOpacity?: number | null;
  /**
   * Whether pull-down can close the viewer
   * @defaultValue true
   */
  pullClosable?: boolean;
  /**
   * Banner visibility
   * @defaultValue true
   */
  bannerVisible?: boolean;
  /**
   * Custom overlay render function
   */
  overlayRender?: (overlayProps: OverlayRenderProps) => React.ReactNode;
  /**
   * Custom toolbar render function
   */
  toolbarRender?: (overlayProps: OverlayRenderProps) => React.ReactNode;
  className?: string;
  maskClassName?: string;
  photoWrapClassName?: string;
  photoClassName?: string;
  /**
   * Custom loading element
   */
  loadingElement?: React.ReactElement;
  /**
   * Custom broken/error element
   */
  brokenElement?: React.ReactElement | ((photoProps: BrokenElementParams) => React.ReactElement);
  /**
   * @defaultValue document.body
   */
  portalContainer?: HTMLElement;
}

export type PhotoRenderParams = {
  /**
   * Custom render DOM attributes
   */
  attrs: Partial<React.HTMLAttributes<HTMLElement>>;
  scale: number;
  rotate: number;
};

/**
 * brokenElement function parameters
 */
export interface BrokenElementParams {
  src: string;
}

export interface OverlayRenderProps {
  /**
   * Image list
   */
  images: DataType[];
  /**
   * Current index
   */
  index: number;
  /**
   * Index change callback
   */
  onIndexChange: (index: number) => void;
  /**
   * Whether visible
   */
  visible: boolean;
  /**
   * Close event callback
   */
  onClose: (evt?: React.MouseEvent | React.TouchEvent) => void;
  /**
   * Whether overlay is visible
   */
  overlayVisible: boolean;
  /**
   * Custom overlay node
   */
  overlay?: React.ReactNode;
  /**
   * Current rotation angle
   */
  rotate: number;
  /**
   * Rotation event callback
   */
  onRotate: (rotate: number) => void;
  /**
   * Current scale
   */
  scale: number;
  /**
   * Scale event callback
   */
  onScale: (scale: number) => void;
}

export interface ExposedProperties {
  // Scale
  scale?: number;
  // Rotation
  rotate?: number;
  // Scale callback
  onScale?: (scale: number) => void;
  // Rotation callback
  onRotate?: (rotate: number) => void;
}

export type ReachMoveFunction = (reachPosition: ReachType, clientX: number, clientY: number, scale?: number) => void;

export type ReachFunction = (clientX: number, clientY: number) => void;

export type PhotoTapFunction = (clientX: number, clientY: number) => void;

/**
 * Edge overflow state
 */
export type CloseEdgeType =
  | 1 // Smaller than screen width
  | 2 // Touching left/top edge
  | 3 // Touching right/bottom edge
  | undefined; // Normal sliding

/**
 * Edge reach state
 */
export type ReachType =
  | 'x' // X axis
  | 'y' // Y axis
  | undefined; // Not reached

/**
 * Initial touch response state
 */
export type TouchStartType =
  | 0 // Not triggered
  | 1 // X axis priority
  | 2 // Y axis push up
  | 3; // Y axis pull down

export type OriginRectType = {
  // top
  T: number;
  // left
  L: number;
  // width
  W: number;
  // height
  H: number;
  // object-fit
  FIT: 'contain' | 'cover' | 'fill' | undefined;
};

/**
 * Animation state
 */
export type EasingMode =
  // Uninitialized
  | 0
  // Enter: start
  | 1
  // Enter: animation start
  | 2
  // Enter: animation second frame
  | 3
  // Normal
  | 4
  // Close
  | 5;

/**
 * Active animation type
 */
export type ActiveAnimationType =
  // Uninitialized
  | 0
  // Enter
  | 1
  // Leave
  | 2
  // Switch
  | 3;
