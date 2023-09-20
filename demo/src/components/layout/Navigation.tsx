import { Heart, Menu, Moon, Sun } from '@rothko-ui/icons';
import { Button, Flex, FlexItem, Typography, WidthGeqOnly, useRothko } from '@rothko-ui/ui';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import config from '../../config';
import styles from './Navigation.module.scss';

type NavigationProps = {
  openDrawer: () => void;
  withoutToggle?: boolean;
};

const Navigation = ({ openDrawer, withoutToggle }: NavigationProps) => {
  const router = useRouter();
  const { mode, toggleMode } = useRothko();

  useEffect(() => {
    if (typeof window !== 'undefined' && mode) {
      // Set a cookie
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
      cookieCutter.set(config.preference.themeMode, mode, { expires: expirationDate, path: '/' });
    }
  }, [mode]);

  return (
    <nav className={router.pathname === '/' ? `${styles.nav} ${styles.blurry}` : styles.nav}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" justifyContent="center" columnGap="1rem">
          <FlexItem>
            <button
              aria-label="menu button"
              className={`dflx ${styles.phantomButton}`}
              onClick={() => openDrawer()}
            >
              <Menu width={28} height={28} />
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
              <Typography.caption>v{config.version}</Typography.caption>
            </Flex>
          </FlexItem>
        </Flex>
        <Flex justifyContent="center" alignItems="center" columnGap="1.75rem">
          {!withoutToggle && (
            <div>
              <button onClick={() => toggleMode()} className="phantom-button">
                {mode === 'dark' ? <Moon width={25} height={25} /> : <Sun width={28} height={28} />}
              </button>
            </div>
          )}
          <WidthGeqOnly threshold={750} style={{ height: '100%' }}>
            <Button
              size="s"
              kind="primary"
              style={{ height: '100%' }}
              // style={{ background: 'white', color: 'black' }}
              accessoryLeft={({ size, color }) => <Heart fill={color} height={size} width={size} />}
              onClick={() => router.push('/sponsor')}
            >
              Sponsor
            </Button>
          </WidthGeqOnly>
        </Flex>
      </Flex>
    </nav>
  );
};

/*
            <Toggle
              kind="success"
              toggled={mode === 'dark'}
              onChange={() => toggleMode()}
              onIcon={<Moon fill="#000" />}
              offIcon={<Sun fill="#000" />}

          
            />
          */

export default Navigation;
