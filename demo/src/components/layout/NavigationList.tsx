import { Paragraph, LinkButton } from '@rothko-ui/react';
import Link from 'next/link';
import React from 'react';

import { NAVIGATION_LIST } from './constants';
import { isLeaf } from './helpers';
import type { NavigationSection } from './types';
import { List, ListItem } from '../list';

type ExpandNavListProps = {
  idx: number;
  depth?: number;
  item: NavigationSection;
  selected?: string;
  onNavigate?: () => void;
};

const ExpandNavList = ({ idx, depth = 0, item, selected, onNavigate }: ExpandNavListProps) => {
  if (isLeaf(item)) {
    const isSelected = selected === item.to;
    return (
      <ListItem>
        <Link href={item.to}>
          <LinkButton
            as="span"
            onClick={() => {
              onNavigate?.();
            }}
            style={{
              display: 'inline-block',
              textDecoration: 'none',
              width: '100%',
              textAlign: 'inherit',
              padding: `0.5rem calc(${depth} * 0.75rem)`,
              color: 'var(--rothko-foreground, #000)',
              fontWeight: isSelected ? 600 : 400,
              fontFamily: isSelected
                ? 'var(--rothko-font-family-bold)'
                : 'var(--rothko-font-family)',
            }}
          >
            {isSelected ? '\\ ' : ''}
            {item.label}
          </LinkButton>
        </Link>
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
            selected={selected}
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

type NavigationListProps = {
  onNavigate?: () => void;
  selected?: string;
  style?: React.CSSProperties;
};

const NavigationList = ({ onNavigate, selected, style }: NavigationListProps) => (
  <nav style={style}>
    {NAVIGATION_LIST.map((item, idx) => (
      <ExpandNavList
        idx={idx}
        item={item}
        key={`${isLeaf(item) ? 'leaf' : 'section'}_${item.label}`}
        onNavigate={onNavigate}
        selected={selected}
      />
    ))}
  </nav>
);

export default NavigationList;
