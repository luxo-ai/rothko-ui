// 'use client';
import { Email, Github, Heart, Twitter } from '@rothko-ui/icons';
import { Drawer, Flex, Typography, useRothko } from '@rothko-ui/ui';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import config from '../../config';
import NavigationList from '../navigation/NavigationList';
import Navigation from './Navigation';
import styles from './Navigation.module.scss';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: React.ReactNode;
  withoutToggle?: boolean;
};

const PaddedNavLayout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, withoutToggle }, ref) => {
    const router = useRouter();
    const { mode } = useRothko();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const closeDrawer = useCallback(() => setIsDrawerOpen(false), [setIsDrawerOpen]);
    const openDrawer = useCallback(() => setIsDrawerOpen(true), [setIsDrawerOpen]);
    return (
      <div ref={ref} style={{ flex: 1 }} className={styles.paddedNavContainer}>
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <NavigationList
            // too lazy to fix this, remove starting '/' in path
            selected={router.pathname.substring(1)}
            onNavigate={() => setIsDrawerOpen(false)}
          />
        </Drawer>
        <header>
          <Navigation withoutToggle={withoutToggle} openDrawer={openDrawer} />
        </header>
        <main>{children}</main>
        <footer>
          <Typography.bodySmall style={{ marginBottom: '0.5rem' }}>
            Built with{' '}
            <span>{<Heart style={{ marginBottom: -2 }} width={16} height={16} fill="red" />}</span>{' '}
            in Brooklyn
          </Typography.bodySmall>
          <Flex columnGap="1rem" justifyContent="center" alignItems="center">
            <Twitter width={20} height={20} fill={mode === 'dark' ? '#cccc' : undefined} />
            <Link href={config.repoUrl} target="_bank" className="phantom-button">
              <Github width={20} height={20} fill={mode === 'dark' ? '#cccc' : undefined} />
            </Link>
            <Link href={`mailto:${config.contactEmail}`} className="phantom-button">
              <Email width={20} height={20} fill={mode === 'dark' ? '#cccc' : undefined} />
            </Link>
          </Flex>
        </footer>
      </div>
    );
  }
);

PaddedNavLayout.displayName = 'PaddedNavLayout';

export default PaddedNavLayout;
