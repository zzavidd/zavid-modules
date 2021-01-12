import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { Transition } from 'react-transition-group';

/**
 * The transitioner for fading in components.
 */
export const Fader = (props: FaderProps) => {
  const { duration, delay = 0, postTransitions } = props;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease ${delay}ms`,
    opacity: 0
  };

  const transitionStyles = {
    entered: {
      opacity: 1,
      transition: `${defaultStyle.transition}, ${postTransitions}`
    },
    exited: defaultStyle
  };

  return (
    <Transitioner
      {...props}
      defaultStyle={defaultStyle}
      transitionStyles={transitionStyles}
    />
  );
};

/**
 * The transitioner for zooming in components.
 */
export const Zoomer = (props: ZoomerProps) => {
  const { duration, delay = 0, postTransitions } = props;

  const defaultStyle = {
    transition: `transform ${duration}ms ease ${delay}ms`,
    transform: 'scale(0)'
  };

  const transitionStyles = {
    entered: {
      transform: 'scale(1)',
      transition: `${defaultStyle.transition}, ${postTransitions}`
    },
    exited: defaultStyle
  };

  return (
    <Transitioner
      {...props}
      defaultStyle={defaultStyle}
      transitionStyles={transitionStyles}
    />
  );
};

/**
 * The transitioner for sliding in components.
 */
export const Slider = (props: SliderProps) => {
  const { duration, delay = 0, direction, postTransitions = '' } = props;

  const defaultStyle = {
    transition: `${direction} ${duration}ms ease ${delay}ms,
        opacity ${duration}ms ease ${delay}ms`,
    opacity: 0,
    position: 'relative'
  };

  const transitionStyles = {
    entering: {
      [direction]: '-100vw'
    },
    entered: {
      [direction]: 0,
      opacity: 1,
      transition: `${defaultStyle.transition}, ${postTransitions}`
    }
  };

  return (
    <Transitioner
      {...props}
      defaultStyle={defaultStyle as CSSProperties}
      transitionStyles={transitionStyles}
    />
  );
};

/**
 * The superclass transitioner.
 */
const Transitioner = ({
  children,
  className,
  defaultStyle,
  determinant,
  hollow,
  style,
  transitionStyles
}: TransitionerProps) => {
  return (
    <Transition in={determinant} timeout={{}}>
      {(state) => {
        if (hollow) {
          return React.cloneElement(children as ReactElement, {
            style: { ...defaultStyle, ...transitionStyles[state], ...style }
          });
        } else {
          return (
            <div
              className={className}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
                ...style
              }}>
              {children}
            </div>
          );
        }
      }}
    </Transition>
  );
};

export type FaderProps = Template;
export type ZoomerProps = Template;
export type SliderProps = Template & { direction: string };

type TransitionerProps = Template & {
  defaultStyle: CSSProperties;
  transitionStyles: {
    [key: string]: CSSProperties;
  };
};


type Template = {
  determinant: boolean;
  duration: number;
  delay?: number;
  postTransitions?: string;
  hollow?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};