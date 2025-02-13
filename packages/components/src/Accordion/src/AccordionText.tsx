import React from 'react';
import type { RothkoKind } from '@rothko-ui/system';
import { classes } from '@rothko-ui/system';

type TextProps = {
  children: React.ReactNode;
  kind?: RothkoKind;
};

const textClasss = ['m-0', 'p-0'];

export const AccordionBodyText = ({ children }: TextProps) => {
  return <p className={classes(...textClasss)}>{children}</p>;
};

export const AccordionTitleText = ({ children }: TextProps) => {
  const baseTitleTextClasses = classes(...textClasss, 'font-rothko-bold', 'font-weight-bold');
  return <span className={baseTitleTextClasses}>{children}</span>;
};

export const AccordionSubtitleText = ({ children }: TextProps) => {
  const baseSubtitleTextClasses = classes(
    ...textClasss,
    'font-rothko-light',
    'font-size-(--rothko-font-size-body-small)',
    'line-height-(--rothko-line-height-body-small)',
    'opacity-85'
  );
  return <span className={baseSubtitleTextClasses}>{children}</span>;
};
