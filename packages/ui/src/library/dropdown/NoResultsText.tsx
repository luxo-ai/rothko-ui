import React from 'react';
import Typography from '../../components/Typography/Typography';
import styles from './NoResultsText.module.scss';

type NoResultsTextProps = {
  children?: React.ReactNode;
};

const NoResultsText = ({ children }: NoResultsTextProps) => {
  return <Typography.body className={styles['no-results-text']}>{children}</Typography.body>;
};

export default NoResultsText;
