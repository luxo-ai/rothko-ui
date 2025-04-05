import { Paragraph } from '@rothko-ui/typography';
import React from 'react';

import { NAVIGATION_LIST } from './constants';
import { isLeaf } from './helpers';
import { NavListLink } from './NavListLink';
import type { NavigationSection } from './types';

import { List, ListItem } from '@/components/list';

type ExpandNavListProps = {
  idx: number;
  depth?: number;
  item: NavigationSection;
  onNavigate?: () => void;
};

const ExpandNavList = ({ idx, depth = 0, item, onNavigate }: ExpandNavListProps) => {
  if (isLeaf(item)) {
    return (
      <ListItem>
        <NavListLink href={item.to} depth={depth}>
          {item.label}
        </NavListLink>
      </ListItem>
    );
  }
  return (
    <List margin={0} padding="0">
      <ListItem paddingTop="0.5rem" paddingLeft={`calc(${depth} * 0.75rem)`}>
        <Paragraph
          style={{ letterSpacing: 2, marginTop: idx !== 0 ? '0.25rem' : undefined }}
          size="xs"
        >
          {item.label.toUpperCase()}
        </Paragraph>
      </ListItem>
      <List padding="0">
        {item.children.map((subItem, idx) => (
          <ExpandNavList
            idx={idx}
            onNavigate={onNavigate}
            depth={depth + 1}
            // eslint-disable-next-line react/no-array-index-key
            key={`${item.label}-sub-${idx}`}
            item={subItem}
          />
        ))}
      </List>
    </List>
  );
};

type NavListProps = {
  className?: string;
  onNavigate?: () => void;
  style?: React.CSSProperties;
};

export const NavList = ({ className, onNavigate, style }: NavListProps) => (
  <nav className={className} style={style}>
    {NAVIGATION_LIST.map((item, idx) => (
      <ExpandNavList
        idx={idx}
        item={item}
        key={`${isLeaf(item) ? 'leaf' : 'section'}_${item.label}`}
        onNavigate={onNavigate}
      />
    ))}
  </nav>
);
