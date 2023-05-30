import { ToastContextProvider, WidthGeqOnly } from '@rothko-ui/ui';
import NavigationList from './navigation/NavigationList';
import React from 'react';
import styles from './WithNavigation.module.scss';
import PaddedNavLayout from './layout/PaddedNavLayout';

type WithNavigationProps = {
  selected?: string;
  children: React.ReactNode;
};

const WithNavigation = ({ children, selected }: WithNavigationProps) => (
  <PaddedNavLayout>
    <div className={styles.withNavGrid}>
      <ToastContextProvider>
        <WidthGeqOnly threshold={750}>
          <NavigationList selected={selected} />
        </WidthGeqOnly>
        <div>{children}</div>
      </ToastContextProvider>
    </div>
  </PaddedNavLayout>
);

export default WithNavigation;
