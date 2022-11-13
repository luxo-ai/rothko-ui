import type { RothkoKind } from '../Theme/types';

export type ToastDetails = {
  content?: React.ReactNode;
  duration?: number;
  kind?: RothkoKind;
  label?: React.ReactNode;
  withLife?: boolean;
};

export type ToastKey = string;
