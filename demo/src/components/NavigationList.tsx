import { List, ListItem, Typography } from '@rothko-ui/ui';
import { camelCase, uniqueId } from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import componentsList from './componentsList';

type NavListItemLeaf = {
  text: string;
  to: string;
};

type NavListItem =
  | {
      label: string;
      children: NavListItem[];
    }
  | NavListItemLeaf;

const isLeaf = (item: NavListItem): item is NavListItemLeaf => {
  return 'text' in item && 'to' in item;
};

const navList: NavListItem[] = [
  {
    label: 'Getting Started',
    children: [
      { text: 'Setup', to: 'setup' },
      { text: 'Overview', to: 'overview' },
      { text: 'Theming', to: 'theming' },
      { text: 'Typography', to: 'typography' },
      { text: 'Icons', to: 'icons' },
    ],
  },
  {
    label: 'Components',
    children: componentsList.map(componentName => ({
      text: componentName,
      to: camelCase(componentName),
    })),
  },
  {
    label: 'Forms',
    children: [
      { text: 'Overview', to: 'overview' },
      {
        label: 'Components',
        children: [
          { text: 'Input', to: 'input' },
          { text: 'Checkmark', to: 'checkmark' },
        ],
      },
    ],
  },
];

type ExpandNavListProps = {
  depth?: number;
  item: NavListItem;
  selected?: string;
};

const ExpandNavList = ({ depth = 0, item, selected }: ExpandNavListProps) => {
  if (isLeaf(item)) {
    return (
      <ListItem>
        <Typography.externalLink href={item.to} style={{ textDecoration: 'none', color: 'white' }}>
          <div
            style={{
              padding:
                selected === item.to
                  ? `0.5rem calc(${depth} * 1.25rem - 4px)`
                  : `0.5rem calc(${depth} * 1.25rem)`,
              borderLeft: selected === item.to ? '4px solid orange' : undefined,
              background: selected === item.to ? 'rgb(31, 31, 31)' : undefined,
              color: selected === item.to ? 'white' : undefined,
              cursor: 'pointer',
            }}
          >
            {item.text}
          </div>
        </Typography.externalLink>
      </ListItem>
    );
  }
  return (
    <List padding="0" kind="none">
      <ListItem paddingLeft={`calc(${depth} * 1.25rem)`}>
        <Typography.label style={{ color: 'white' }}>{item.label.toUpperCase()}</Typography.label>
      </ListItem>
      <List padding="0" kind="none">
        {item.children.map((subItem, idx) => (
          <ExpandNavList
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

const NavigationList = () => {
  const { id } = useParams<{ id: string }>();
  const uuid = uniqueId('root');
  return (
    <nav>
      {navList.map((item, idx) => (
        <ExpandNavList selected={id} key={`${uuid}-${idx}`} item={item} />
      ))}
    </nav>
  );
};

export default NavigationList;
