import { Email, Github, Twitter } from '@rothko-ui/icons';
import { Flex, Paragraph } from '@rothko-ui/components';
import Link from 'next/link';
import React from 'react';
import config from '../../config';
import Navigation from './Navigation';
import styles from './Navigation.module.scss';
import { DesktopOnly } from '../Dimensions';
import NavigationList from './NavigationList';
import useTheme from '../theme/useTheme';

type LayoutProps = {
  selected?: string;
  children: React.ReactNode;
};

const PaddedNavLayout = ({ children, selected }: LayoutProps) => {
  const { theme } = useTheme();
  return (
    <div className={styles.paddedNavContainer}>
      <header>
        <Navigation />
      </header>
      <main>
        <div className={styles.withNavGrid}>
          <DesktopOnly>
            <NavigationList selected={selected} />
          </DesktopOnly>
          {children}
        </div>
      </main>
      <footer>
        <Flex marginBottom="0.5rem" flexDirection="column" alignItems="center">
          <Paragraph>Built in NYC</Paragraph>
          <Paragraph size="s" light>
            © {new Date().getFullYear()} Rothko-UI
          </Paragraph>
        </Flex>
        <Flex columnGap="1rem" justifyContent="center" alignItems="center">
          <Twitter width={20} height={20} fill={theme === 'dark' ? '#cccc' : undefined} />
          <Link href={config.repoUrl} target="_bank">
            <Github width={20} height={20} fill={theme === 'dark' ? '#cccc' : undefined} />
          </Link>
          <Link href={`mailto:${config.contactEmail}`}>
            <Email width={20} height={20} fill={theme === 'dark' ? '#cccc' : undefined} />
          </Link>
        </Flex>
      </footer>
    </div>
  );
};

export default PaddedNavLayout;
