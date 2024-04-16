import { List, ListItem, Typography } from '@rothko-ui/ui';
import { useRouter } from 'next/navigation';
import React from 'react';
import { NAVIGATION_LIST } from './constants';
import { isLeaf } from './helpers';
import type { NavigationSection } from './types';

type ExpandNavListProps = {
  depth?: number;
  item: NavigationSection;
  selected?: string;
  onNavigate?: () => void;
};

const ExpandNavList = ({ depth = 0, item, selected, onNavigate }: ExpandNavListProps) => {
  const router = useRouter();
  if (isLeaf(item)) {
    const isSelected = selected === item.to;
    return (
      <ListItem>
        <Typography.linkButton
          onClick={() => {
            onNavigate?.();
            router.push(`/${item.to}`);
          }}
          style={{
            textDecoration: 'none',
            width: '100%',
            textAlign: 'inherit',
            padding: `0.5rem calc(${depth} * 0.75rem)`,
            color: 'var(--rothko-foreground, #000)',
          }}
          bold={isSelected}
        >
          {isSelected ? '_ ' : ''}
          {item.label}
        </Typography.linkButton>
      </ListItem>
    );
  }
  return (
    <List margin={0} padding="0" kind="none">
      <ListItem paddingTop="0.5rem" paddingLeft={`calc(${depth} * 0.75rem)`}>
        <Typography.label>{item.label.toUpperCase()}</Typography.label>
      </ListItem>
      <List padding="0" kind="none">
        {item.children.map((subItem, idx) => (
          <ExpandNavList
            onNavigate={onNavigate}
            selected={selected}
            depth={depth + 1}
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
};

const NavigationList = ({ onNavigate, selected }: NavigationListProps) => (
  <nav style={{ marginLeft: '0.5rem', marginTop: '-0.5rem' }}>
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
