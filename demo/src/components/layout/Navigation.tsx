import { Github, Heart, Menu, Moon, Sun } from '@rothko-ui/icons';
import { Button, Drawer, Flex, FlexItem, Heading5 } from '@rothko-ui/react';
import cookieCutter from 'cookie-cutter';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import styles from './Navigation.module.scss';
import { DesktopOnly, MobileOnly } from '../dimensions';
import NavigationList from './NavigationList';
import config from '../../config';
import useTheme from '../../hooks/useTheme';
import { PhantomButton } from '../button';

const Navigation = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const _modeIcon = useMemo(() => {
    return theme === 'dark' ? (
      <Sun fill="#ffbb00" width={28} height={28} />
    ) : (
      <Moon fill="#4833e0" width={27} height={27} />
    );
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && theme) {
      // Set a cookie
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
      cookieCutter.set(config.preference.theme, theme, { expires: expirationDate, path: '/' });
    }
  }, [theme]);

  return (
    <>
      <nav className={styles.nav}>
        <Flex justifyContent="space-between">
          <Flex alignItems="center" justifyContent="center" columnGap="1rem">
            <MobileOnly>
              <FlexItem>
                <PhantomButton
                  aria-label="Menu"
                  className="flex"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <Menu width={28} height={28} />
                </PhantomButton>
              </FlexItem>
            </MobileOnly>
            <FlexItem>
              <NextLink href="/">
                <Flex cursor="pointer" alignItems="end" columnGap="0.25rem">
                  <Heading5>rothko ui</Heading5>
                </Flex>
              </NextLink>
            </FlexItem>
          </Flex>
          <Flex justifyContent="center" alignItems="center" columnGap="1.75rem">
            <Flex justifyContent="center" alignItems="center" columnGap="1rem">
              <NextLink target="_blank" href={config.repoUrl} className={styles.hoverButton}>
                <Github fill={theme === 'dark' ? '#fff' : '#000'} width={28} height={28} />
              </NextLink>
              {/* <PhantomButton className={styles.hoverButton} onClick={() => toggleTheme()}>
                {modeIcon}
              </PhantomButton> */}
            </Flex>
            <DesktopOnly height="100%">
              <NextLink href="/sponsor">
                <Button
                  size="s"
                  kind="primary"
                  style={{ height: '100%' }}
                  accessoryLeft={({ size }) => <Heart height={size} width={size} />}
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
