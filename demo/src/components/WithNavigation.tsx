import { ToastContextProvider } from '@rothko-ui/ui';
import NavigationList from './navigation/NavigationList';
import React from 'react';
import styles from './WithNavigation.module.scss';
import PaddedNavLayout from './layout/PaddedNavLayout';
import { DesktopOnly } from './Dimensions';

type WithNavigationProps = {
  selected?: string;
  children: React.ReactNode;
};

const WithNavigation = ({ children, selected }: WithNavigationProps) => (
  <PaddedNavLayout>
    <div className={styles.withNavGrid}>
      <ToastContextProvider>
        <DesktopOnly>
          <NavigationList selected={selected} />
        </DesktopOnly>
        <div>{children}</div>
      </ToastContextProvider>
    </div>
  </PaddedNavLayout>
);

export default WithNavigation;
