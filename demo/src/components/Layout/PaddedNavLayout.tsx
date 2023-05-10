'use client';
import { Email, Github, Heart, Twitter } from '@rothko-ui/icons';
import { Drawer, DrawerContext, Flex, Typography, useRothko } from '@rothko-ui/ui';
import React, { useCallback, useState } from 'react';
import NavigationList from '../NavigationList';
import Navigation from './Navigation';
import styles from './Navigation.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const PaddedNavLayout = ({ children }: LayoutProps) => {
  const { mode } = useRothko();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [setIsDrawerOpen]);
  const openDrawer = useCallback(() => setIsDrawerOpen(true), [setIsDrawerOpen]);
  return (
    <div className={styles.paddedNavContainer}>
      <DrawerContext.Provider value={{ closeDrawer, isOpen: isDrawerOpen, openDrawer }}>
        <Drawer>
          <NavigationList onNavigate={() => setIsDrawerOpen(false)} />
        </Drawer>
        <header>
          <Navigation />
        </header>
      </DrawerContext.Provider>
      <main>{children}</main>
      <footer>
        <Typography.bodySmall style={{ marginBottom: '0.5rem' }}>
          Built with{' '}
          <span>{<Heart style={{ marginBottom: -2 }} width={16} height={16} fill="red" />}</span> in
          Brooklyn
        </Typography.bodySmall>
        <Flex columnGap="1rem" justifyContent="center" alignItems="center">
          <Twitter width={20} height={20} fill={mode === 'dark' ? '#cccc' : undefined} />
          <Github width={20} height={20} fill={mode === 'dark' ? '#cccc' : undefined} />
          <Email width={20} height={20} fill={mode === 'dark' ? '#cccc' : undefined} />
        </Flex>
      </footer>
    </div>
  );
};

export default PaddedNavLayout;
