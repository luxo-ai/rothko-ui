import { classes } from '@helpers';
import { Paragraph } from '@rothko-ui/typography';
import NextLink from 'next/link';

import styles from './Navigation.module.scss';

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
  pathname: string;
};

export const NavLink = ({ children, href, pathname: _p }: NavLinkProps) => {
  return (
    <NextLink href={href}>
      <Paragraph className={classes('text-[#212b30]', styles.hoverButton)} as="span">
        {children}
      </Paragraph>
    </NextLink>
  );
};
