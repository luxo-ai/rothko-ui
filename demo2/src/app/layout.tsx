import config from '@config';
import { Email, Github } from '@rothko-ui/icons';
import { Paragraph } from '@rothko-ui/typography';
import { headers } from 'next/headers';
import NextLink from 'next/link';

import styles from './layout.module.scss';

import './global.css';
import '../../public/fonts/style.css';
import { Flex } from '@/components/flex';
import { Grid } from '@/components/grid';
import { Navigation } from '@/components/navigation/Navigation';
import { NavList } from '@/components/navigation/NavList';

export const metadata = {
  title: 'Rothko UI',
  // description: '',
};

type LayoutProps = {
  children: React.ReactNode;
};

const PRELOADED_FONTS = [
  { href: '/fonts/LabGrotesque/LabGrotesque-Regular.woff', type: 'font/woff' },
  { href: '/fonts/LabGrotesque/LabGrotesque-Italic.woff', type: 'font/woff' },
  { href: '/fonts/LabGrotesque/LabGrotesque-Bold.woff', type: 'font/woff' },
  { href: '/fonts/LabGrotesque/LabGrotesque-Light.woff', type: 'font/woff' },
  { href: '/fonts/Soehne/Soehne-Buch.woff2', type: 'font/woff2' },
];

const theme = 'light' as string;

const Layout = async (props: LayoutProps) => {
  const headerValues = await headers();
  const pathname = headerValues.get('x-current-path') || '/';
  return (
    <html lang="en">
      <head>
        {PRELOADED_FONTS.map(font => (
          <link
            key={font.href}
            rel="preload"
            href={font.href}
            as="font"
            type={font.type}
            crossOrigin=""
          />
        ))}
      </head>
      <body className={styles.body}>
        <header className={styles.header}>
          <Navigation className={styles.nav} pathname={pathname} />
        </header>
        <main className={styles.main}>
          <Grid gridTemplateColumns="250px 1fr" columnGap="2.5rem">
            <NavList className={styles.navList} />
            <div>{props.children}</div>
          </Grid>
        </main>
        <footer className={styles.footer}>
          <Flex marginBottom="0.5rem" flexDirection="column" alignItems="center">
            <Paragraph size="s">Built in NYC</Paragraph>
            <Paragraph size="s" variant="light">
              © {new Date().getFullYear()} rothko ui
            </Paragraph>
          </Flex>
          <Flex columnGap="1rem" justifyContent="center" alignItems="center">
            <NextLink href={config.repoUrl} target="_bank">
              <Github width={20} height={20} fill={theme === 'dark' ? '#cccc' : undefined} />
            </NextLink>
            <NextLink href={`mailto:${config.contactEmail}`}>
              <Email width={20} height={20} fill={theme === 'dark' ? '#cccc' : undefined} />
            </NextLink>
          </Flex>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
