import type { RothkoKind } from './types';
import { rothkoKinds } from './types';

export const isRothkoKind = (v: string): v is RothkoKind => {
  return (rothkoKinds as readonly string[]).includes(v);
};
