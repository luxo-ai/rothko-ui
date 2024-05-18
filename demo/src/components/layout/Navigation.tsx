import { Github, Heart, Menu, Moon, Sun } from '@rothko-ui/icons';
import {
  Button,
  Drawer,
  Flex,
  FlexItem,
  PhantomButton,
  Typography,
  useRothko,
} from '@rothko-ui/ui';
import cookieCutter from 'cookie-cutter';
import { useEffect, useMemo, useState } from 'react';

import config from '../../config';
import styles from './Navigation.module.scss';
import NextLink from 'next/link';
import { DesktopOnly, MobileOnly } from '../Dimensions';
import NavigationList from './NavigationList';
import { useRouter } from 'next/router';

const Navigation = () => {
  const { mode, toggleMode } = useRothko();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const modeIcon = useMemo(() => {
    return mode === 'dark' ? (
      <Sun fill="#ffbb00" width={28} height={28} />
    ) : (
      <Moon fill="#4833e0" width={27} height={27} />
    );
  }, [mode]);

  useEffect(() => {
    if (typeof window !== 'undefined' && mode) {
      // Set a cookie
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
      cookieCutter.set(config.preference.theme, mode, { expires: expirationDate, path: '/' });
    }
  }, [mode]);

  return (
    <>
      <nav className={styles.nav}>
        <Flex justifyContent="space-between">
          <Flex alignItems="center" justifyContent="center" columnGap="1rem">
            <MobileOnly>
              <FlexItem>
                <PhantomButton displayFlex aria-label="Menu" onClick={() => setIsDrawerOpen(true)}>
                  <Menu width={28} height={28} />
                </PhantomButton>
              </FlexItem>
            </MobileOnly>
            <FlexItem>
              <NextLink href="/">
                <Flex cursor="pointer" alignItems="end" columnGap="0.25rem">
                  <Typography.h5>Rothko UI</Typography.h5>
                  {config.version && <Typography.caption>v{config.version}</Typography.caption>}
                </Flex>
              </NextLink>
            </FlexItem>
          </Flex>
          <Flex justifyContent="center" alignItems="center" columnGap="1.75rem">
            <Flex justifyContent="center" alignItems="center" columnGap="1rem">
              <NextLink
                target="_blank"
                href={config.repoUrl}
                style={{ display: 'flex' }}
                className={styles.hoverButton}
              >
                <Github fill={mode === 'dark' ? '#fff' : '#000'} width={28} height={28} />
              </NextLink>
              <PhantomButton
                displayFlex
                className={styles.hoverButton}
                onClick={() => toggleMode()}
              >
                {modeIcon}
              </PhantomButton>
            </Flex>
            <DesktopOnly height="100%">
              <NextLink href="/sponsor">
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
              </NextLink>
            </DesktopOnly>
          </Flex>
        </Flex>
      </nav>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <NavigationList
          style={{ marginLeft: '0.5rem' }}
          selected={router.pathname}
          onNavigate={() => setIsDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
};

export default Navigation;
