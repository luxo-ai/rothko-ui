import { Paragraph, Label, LinkButton } from '@rothko-ui/components';
import React from 'react';
import { NAVIGATION_LIST } from './constants';
import { isLeaf } from './helpers';
import type { NavigationSection } from './types';
import Link from 'next/link';
import { List, ListItem } from '../List';

type ExpandNavListProps = {
  depth?: number;
  item: NavigationSection;
  selected?: string;
  onNavigate?: () => void;
};

const ExpandNavList = ({ depth = 0, item, selected, onNavigate }: ExpandNavListProps) => {
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
            {isSelected ? '_ ' : ''}
            {item.label}
          </LinkButton>
        </Link>
      </ListItem>
    );
  }
  return (
    <List margin={0} padding="0">
      <ListItem paddingTop="0.5rem" paddingLeft={`calc(${depth} * 0.75rem)`}>
        <Paragraph bold size="xs">
          {item.label.toUpperCase()}
        </Paragraph>
      </ListItem>
      <List padding="0">
        {item.children.map((subItem, idx) => (
          <ExpandNavList
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
    {NAVIGATION_LIST.map(item => (
      <ExpandNavList
        item={item}
        key={`${isLeaf(item) ? 'leaf' : 'section'}_${item.label}`}
        onNavigate={onNavigate}
        selected={selected}
      />
    ))}
  </nav>
);

export default NavigationList;
