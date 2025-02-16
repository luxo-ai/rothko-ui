import { classes } from '@rothko-ui/system';
import React from 'react';

type TextProps = {
  children: React.ReactNode;
};

const commonClassNames = 'm-0 p-0';

export const AccordionBodyText = ({ children }: TextProps) => {
  return <p className={commonClassNames}>{children}</p>;
};

export const AccordionTitleText = ({ children }: TextProps) => {
  const baseTitleTextClasses = classes(commonClassNames, 'rothko-font-bold');
  return <span className={baseTitleTextClasses}>{children}</span>;
};

export const AccordionSubtitleText = ({ children }: TextProps) => {
  const baseSubtitleTextClasses = classes(
    commonClassNames,
    'rothko-font-light rothko-paragraph-size-s opacity-85'
  );
  return <span className={baseSubtitleTextClasses}>{children}</span>;
};
