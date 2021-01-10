import React, { ReactNode, useState } from 'react';
import LazyLoad from 'react-lazyload';
import VisibilitySensor from 'react-visibility-sensor';

/**
 * The component wrapper used to lazy load elements.
 */
export const LazyLoader = ({
  children,
  setInView,
  height = 400,
  offset = -100
}: LazyLoaderProps) => {
  const [shouldDetectChange, setDetectivity] = useState(true);

  const toggleVisibility = () => {
    setInView(true);
    setDetectivity(false);
  };

  return (
    <LazyLoad height={height} offset={offset} once>
      <VisibilitySensor
        onChange={toggleVisibility}
        partialVisibility={true}
        active={shouldDetectChange}>
        {children}
      </VisibilitySensor>
    </LazyLoad>
  );
};

type LazyLoaderProps = {
  /** The element to be lazy loaded. */
  children: ReactNode;

  /** The hook to set whether the child element is in the viewport. */
  setInView: React.Dispatch<React.SetStateAction<boolean>>;

  /** The height of the placeholder. */
  height?: number;

  /** The distance from the edge of the viewport before the element is loaded in. */
  offset?: number;
};
