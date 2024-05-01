import { Github, Heart, Menu, Moon, Sun } from '@rothko-ui/icons';
import { Button, Flex, FlexItem, Typography, useRothko } from '@rothko-ui/ui';
import cookieCutter from 'cookie-cutter';
import { useEffect } from 'react';

import config from '../../config';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import { DesktopOnly, MobileOnly } from '../Dimensions';

type NavigationProps = {
  openDrawer: () => void;
  withoutToggle?: boolean;
};

const Navigation = ({ openDrawer, withoutToggle }: NavigationProps) => {
  const { mode, toggleMode } = useRothko();

  useEffect(() => {
    if (typeof window !== 'undefined' && mode) {
      // Set a cookie
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
      cookieCutter.set(config.preference.themeMode, mode, { expires: expirationDate, path: '/' });
    }
  }, [mode]);

  return (
    <nav className={styles.nav}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" justifyContent="center" columnGap="1rem">
          <MobileOnly>
            <FlexItem>
              <button
                aria-label="menu button"
                className={`dflx ${styles.phantomButton}`}
                onClick={() => openDrawer()}
              >
                <Menu width={28} height={28} />
              </button>
            </FlexItem>
          </MobileOnly>
          <FlexItem>
            <Link href="/">
              <Flex cursor="pointer" alignItems="end" columnGap="0.25rem">
                <Typography.h5>Rothko UI</Typography.h5>
                {config.version && <Typography.caption>v{config.version}</Typography.caption>}
              </Flex>
            </Link>
          </FlexItem>
        </Flex>
        <Flex justifyContent="center" alignItems="center" columnGap="1.75rem">
          <Flex justifyContent="center" alignItems="center" columnGap="1rem">
            <Link
              target="_blank"
              href={config.repoUrl}
              className={styles.phantomButton}
              rel="noreferrer"
            >
              <Github fill={mode === 'dark' ? '#fff' : '#000'} width={28} height={28} />
            </Link>
            {!withoutToggle && (
              <button onClick={() => toggleMode()} className={styles.phantomButton}>
                {mode === 'dark' ? (
                  <Sun fill="#ffbb00" width={28} height={28} />
                ) : (
                  <Moon fill="#4833e0" width={27} height={27} />
                )}
              </button>
            )}
          </Flex>
          <DesktopOnly height="100%">
            <Link href="/sponsor">
              <Button
                size="s"
                kind="primary"
                style={{ height: '100%' }}
                accessoryLeft={({ size, color }) => (
                  <Heart fill={color} height={size} width={size} />
                )}
              >
                Sponsor
              </Button>
            </Link>
          </DesktopOnly>
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navigation;
