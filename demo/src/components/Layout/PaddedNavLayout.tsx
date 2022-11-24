import { Drawer, DrawerContext } from '@rothko-ui/ui';
import React, { useCallback, useState } from 'react';
import NavigationList from '../NavigationList';
import Navigation from './Navigation';
import styles from './Navigation.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const PaddedNavLayout = ({ children }: LayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [setIsDrawerOpen]);
  const openDrawer = useCallback(() => setIsDrawerOpen(true), [setIsDrawerOpen]);
  return (
    <div className={styles.paddedNavContainer}>
      <DrawerContext.Provider value={{ closeDrawer, isOpen: isDrawerOpen, openDrawer }}>
        <Drawer>
          <NavigationList />
        </Drawer>
        <header>
          <Navigation />
        </header>
      </DrawerContext.Provider>
      <main>{children}</main>
    </div>
  );
};

export default PaddedNavLayout;
