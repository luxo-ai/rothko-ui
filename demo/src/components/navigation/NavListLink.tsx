'use client';

import { Paragraph } from '@rothko-ui/typography';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  children: string;
  href: string;
  depth: number;
};

export const NavListLink = ({ children, href, depth }: NavLinkProps) => {
  const pathname = usePathname();
  const isSelected = pathname === href;
  return (
    <NextLink href={href}>
      <Paragraph
        as="span"
        style={{
          display: 'inline-block',
          textDecoration: 'none',
          width: '100%',
          textAlign: 'inherit',
          padding: `0.5rem calc(${depth} * 0.75rem)`,
          color: 'var(--rothko-foreground, #000)',
          fontWeight: isSelected ? 600 : 400,
          fontFamily: isSelected ? 'var(--rothko-font-family-bold)' : 'var(--rothko-font-family)',
        }}
      >
        {isSelected ? '\\ ' : ''}
        {children}
      </Paragraph>
    </NextLink>
  );
};
