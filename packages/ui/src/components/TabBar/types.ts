import type React from 'react';

import type { KeyLike } from '@rothko-ui/utils';
import type { WithAriaLabeling } from '../../types';

export type RenderTab = () => JSX.Element;

export type Tab<Key extends KeyLike = string> = {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  title: string;
  key: Key;
  render: React.ReactElement;
};

export type WithAria<T> = WithAriaLabeling<T>;
