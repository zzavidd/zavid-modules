import React, { ReactNode } from 'react';
import MediaQuery from 'react-responsive';

export enum ScreenWidth {
  SMALL = '(max-width: 576px)',
  MEDIUM = '(max-width: 768px)',
  LARGE = '(max-width: 992px)',
  XLARGE = '(max-width: 1200px)',
  XXLARGE = '(max-width: 1408px)'
}

export const Responsive = ({
  defaultView,
  desktopView,
  laptopView,
  tabletView,
  mobileView
}: ResponsiveOptions) => {
  if (!defaultView) defaultView = null;

  if (desktopView) {
    return (
      <>
        <MediaQuery minWidth={1200}>{defaultView}</MediaQuery>
        <MediaQuery maxWidth={1200}>{desktopView}</MediaQuery>
      </>
    );
  } else if (laptopView) {
    return (
      <>
        <MediaQuery minWidth={992}>{defaultView}</MediaQuery>
        <MediaQuery maxWidth={992}>{laptopView}</MediaQuery>
      </>
    );
  } else if (tabletView) {
    return (
      <>
        <MediaQuery minWidth={768}>{defaultView}</MediaQuery>
        <MediaQuery maxWidth={768}>{tabletView}</MediaQuery>
      </>
    );
  } else {
    return (
      <>
        <MediaQuery minWidth={576}>{defaultView}</MediaQuery>
        <MediaQuery maxWidth={576}>{mobileView}</MediaQuery>
      </>
    );
  }
};

type ResponsiveOptions = {
  defaultView?: ReactNode;
  desktopView?: ReactNode;
  laptopView?: ReactNode;
  tabletView?: ReactNode;
  mobileView?: ReactNode;
};
