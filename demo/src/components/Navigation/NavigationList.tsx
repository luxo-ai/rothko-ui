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
    return (
      <ListItem>
        <Typography.linkButton
          asText
          onClick={() => {
            onNavigate?.();
            router.push(`/${item.to}`);
          }}
          style={{ textDecoration: 'none', width: '100%', textAlign: 'inherit' }}
        >
          <div
            style={{
              padding: `0.5rem calc(${depth} * 1.25rem)`,
              color: selected === item.to ? 'var(--rothko-link, #000)' : undefined,
              cursor: 'pointer',
            }}
          >
            {item.label}
          </div>
        </Typography.linkButton>
      </ListItem>
    );
  }
  return (
    <List padding="0" kind="none">
      <ListItem paddingLeft={`calc(${depth} * 1.25rem)`}>
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
  <nav>
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
