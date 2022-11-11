import type { RothkoKind } from '../Theme';

export type ToastDetails = {
  kind?: RothkoKind;
  label?: React.ReactNode;
  content?: React.ReactNode;
  duration?: number;
  withLife?: boolean;
};

export type ToastKey = string;
