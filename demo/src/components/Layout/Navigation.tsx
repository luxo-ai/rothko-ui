import { Heart, Menu, Moon, Sun } from '@rothko-ui/icons';
import { Button, Flex, FlexItem, Toggle, Typography, WidthGeqOnly, useRothko } from '@rothko-ui/ui';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { ROTHKO_MODE_COOKIE_NAME } from '../../constants';
import styles from './Navigation.module.scss';

type NavigationProps = {
  openDrawer: () => void;
};

const Navigation = ({ openDrawer }: NavigationProps) => {
  const router = useRouter();
  const { mode, toggleMode } = useRothko();

  useEffect(() => {
    if (typeof window !== 'undefined' && mode) {
      // Set a cookie
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
      cookieCutter.set(ROTHKO_MODE_COOKIE_NAME, mode, { expires: expirationDate, path: '/' });
    }
  }, [mode]);

  return (
    <nav className={styles.nav}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" justifyContent="center" columnGap="1rem">
          <FlexItem>
            <button className={`dflx ${styles.phantomButton}`} onClick={() => openDrawer()}>
              <Menu width={24} height={24} />
            </button>
          </FlexItem>
          <FlexItem>
            <Flex
              onClick={() => router.push('/')}
              cursor="pointer"
              alignItems="end"
              columnGap="0.25rem"
            >
              <Typography.h5>Rothko UI</Typography.h5>
              <Typography.caption>v1.0.0</Typography.caption>
            </Flex>
          </FlexItem>
        </Flex>
        <Flex columnGap="1.25rem">
          <WidthGeqOnly threshold={750}>
            <Button
              size="s"
              kind="warning"
              style={{ height: '100%' }}
              // style={{ background: 'white', color: 'black' }}
              accessoryLeft={({ size }) => (
                <Heart style={{ marginRight: '0.5rem' }} fill="black" height={size} width={size} />
              )}
              onClick={() => router.push('/sponsor')}
            >
              Sponsor
            </Button>
          </WidthGeqOnly>
          <Toggle
            kind="info"
            toggled={mode === 'dark'}
            onChange={() => toggleMode()}
            /* make react node or react FC -- same for button */
            onIcon={<Moon fill="#000" />}
            offIcon={<Sun fill="#000" />}
          />
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navigation;
