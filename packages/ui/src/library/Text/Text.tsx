import React from 'react';
import { Typography } from '../../components/Typography';
import styles from './Texttt.module.scss';
import type { RothkoKind } from '../../theme';

export const AccordionDefaultBodyText = ({ children }: { children: React.ReactNode }) => {
  return <Typography.body className={styles['accordion__text']}>{children}</Typography.body>;
};

export const AccordionDefaultTitleText = ({
  children,
  kind,
}: {
  children: React.ReactNode;
  kind?: RothkoKind;
}) => {
  return (
    <Typography.body bold className={styles['accordion__text']} kind={kind}>
      {children}
    </Typography.body>
  );
};

export const AccordionDefaultSubtitleText = ({
  children,
  kind,
}: {
  children: React.ReactNode;
  kind?: RothkoKind;
}) => {
  return (
    <Typography.bodySmall
      light
      kind={kind}
      style={{ opacity: 0.8 }}
      className={styles['accordion__text']}
    >
      {children}
    </Typography.bodySmall>
  );
};
