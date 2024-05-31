import React from 'react';
import type { SliderWidth } from '../types';
import styles from './SliderContainer.module.scss';
import { Container } from '../../../layout';

type SliderContainerDivProps = {
  id?: string;
  style?: React.CSSProperties;
  maxWidth: SliderWidth;
  minWidth: SliderWidth;
  children?: React.ReactNode;
  className?: string;
};

export const SliderContainer = ({
  maxWidth,
  minWidth,
  children,
  id,
  style,
  className,
}: SliderContainerDivProps) => {
  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...style}
      className={className}
      id={id}
      width="100%"
      height="100%"
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      {children}
    </Container>
  );
};

export const SliderLegendContainer = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles['slider__legend-container']}>{children}</div>;
};
