import { AemikoKind } from '../Theme';

export type ToastDetails = {
  kind?: AemikoKind;
  label?: React.ReactNode;
  content?: React.ReactNode;
  duration?: number;
  withLife?: boolean;
};

export type ToastKey = string;
