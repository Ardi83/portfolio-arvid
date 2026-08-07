declare module '@splidejs/react-splide' {
  import {ComponentType, ReactNode} from 'react';

  export interface SplideProps {
    children?: ReactNode;
    options?: any;
    [key: string]: any;
  }

  export interface SplideSlideProps {
    children?: ReactNode;
    [key: string]: any;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
