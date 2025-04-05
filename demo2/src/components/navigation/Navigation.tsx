import config from '@config';
import { Github } from '@rothko-ui/icons';
import { Heading5 } from '@rothko-ui/typography';
import type { Theme } from '@types';
import NextLink from 'next/link';

import styles from './Navigation.module.scss';
import { NavLink } from './NavLink';
import { DesktopOnly, MobileOnly } from '../dimensions';
import { NavMobileMenu } from './NavMobileMenu';

import { Flex } from '@/components/flex';

type NavigationProps = {
  theme?: Theme;
  className?: string;
};

export const Navigation = ({ theme = 'light', className }: NavigationProps) => {
  return (
    <nav className={className}>
      <Flex columnGap="1rem" justifyContent="space-between" flexWrap="wrap">
        <Flex flexShrink={0} alignItems="center" justifyContent="center" gap="1rem">
          <MobileOnly>
            <NavMobileMenu />
          </MobileOnly>
          <div>
            <NextLink href="/">
              <Heading5 as="span" className="pointer">
                rothko ui
              </Heading5>
            </NextLink>
          </div>
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap="2rem">
          <DesktopOnly>
            <Flex justifyContent="center" alignItems="center" gap="1rem">
              <NavLink href="/overview">Docs</NavLink>
              <NavLink href="/components">Components</NavLink>
              {/* <NavLink href="/changelog">Changelog</NavLink> */}
              <NavLink href="/sponsor">Sponsor</NavLink>
            </Flex>
          </DesktopOnly>
          <NextLink target="_blank" href={config.repoUrl} className={styles.hoverButton}>
            <Github fill={theme === 'dark' ? '#fff' : '#000'} width={27} height={27} />
          </NextLink>
        </Flex>
      </Flex>
    </nav>
  );
};
