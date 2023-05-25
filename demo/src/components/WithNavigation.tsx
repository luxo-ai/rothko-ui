import { ToastContextProvider, WidthGeqOnly } from '@rothko-ui/ui';
import NavigationList from './nnavigation/NavigationList';
import React from 'react';
import styles from './WithNavigation.module.scss';

type WithNavigationProps = {
  selected?: string;
  children: React.ReactNode;
};

const WithNavigation = ({ children, selected }: WithNavigationProps) => (
  <div className={styles.withNavGrid}>
    <ToastContextProvider>
      <WidthGeqOnly threshold={750}>
        <NavigationList selected={selected} />
      </WidthGeqOnly>
      <div>{children}</div>
    </ToastContextProvider>
  </div>
);

export default WithNavigation;
