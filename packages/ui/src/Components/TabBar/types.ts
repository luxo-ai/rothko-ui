import type { KeyLike } from 'utils';

export type RenderTab = () => JSX.Element;

export type Tab<Key extends KeyLike = string> = {
  title: string;
  key: Key;
  render: RenderTab;
};
