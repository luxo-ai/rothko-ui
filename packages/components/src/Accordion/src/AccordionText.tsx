import React from 'react';
import type { RothkoKind } from '@rothko-ui/system';
import { scopedClasses } from '@rothko-ui/system';
import styles from './AccordionText.module.scss';

const sc = scopedClasses(styles);

type TextProps = {
  children: React.ReactNode;
  kind?: RothkoKind;
};

export const AccordionBodyText = ({ children, kind }: TextProps) => {
  return <p className={sc('text', kind && `color--${kind}`)}>{children}</p>;
};

export const AccordionTitleText = ({ children, kind }: TextProps) => {
  return <p className={sc('text', kind && `color--${kind}`)}>{children}</p>;
};

export const AccordionSubtitleText = ({ children, kind }: TextProps) => {
  return <p className={sc('text', 'subtext', kind && `color--${kind}`)}>{children}</p>;
};
