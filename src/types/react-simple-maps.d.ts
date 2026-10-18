declare module 'react-simple-maps' {
  import * as React from 'react';

  export interface ComposableMapProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    projection?: string | ((...args: any[]) => any);
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
      parallels?: [number, number];
      clipAngle?: number;
      precision?: number;
    };
    children?: React.ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface ZoomableGroupProps extends React.SVGProps<SVGGElement> {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    onMoveStart?: (position: any, event: any) => void;
    onMove?: (position: any, event: any) => void;
    onMoveEnd?: (position: any, event: any) => void;
    children?: React.ReactNode;
  }

  export const ZoomableGroup: React.FC<ZoomableGroupProps>;

  export interface GeographiesProps {
    geography?: string | Record<string, any> | string[];
    children?: (props: {
      geographies: any[];
      outline?: any;
      borders?: any;
      projection?: any;
      path?: any;
    }) => React.ReactNode;
    parseGeographies?: (geos: any[]) => any[];
  }

  export const Geographies: React.FC<GeographiesProps>;

  export interface GeographyProps extends Omit<React.SVGProps<SVGPathElement>, 'style'> {
    geography?: any;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }

  export const Geography: React.FC<GeographyProps>;
}
