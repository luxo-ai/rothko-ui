import { compact, asCompactedArray } from './helpers';

import type { RothkoKind } from '../types';
import type { Falsy } from './types';

const PREFIX = '--rothko';

type Category = 'foreground' | 'background' | 'border' | 'color';

type Element =
  | 'accordion'
  | 'alert'
  | 'bottom-popup'
  | 'breadcrumbs'
  | 'button'
  | 'checkbox'
  | 'drawer'
  | 'dropdown'
  | 'input'
  | 'list'
  | 'modal'
  | 'option-group'
  | 'radio'
  | 'search'
  | 'skeleton'
  | 'slider'
  | 'switch'
  | 'tab-bar'
  | 'table'
  | 'tag'
  | 'toast';

type Scale = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type Args = {
  kind?: RothkoKind;
  element?:
    | Element
    | `${Element}-${string}`
    | 'icon'
    | 'typography-link'
    | 'typography-body'
    | 'typography-heading'
    | 'typography-code';
  scale?: Scale;
  category: Category;
  fallback?: string | string[];
  focused?: boolean;
};

export const vuar = ({ kind, scale, element, category, fallback, focused }: Args) => {
  const fallbacks = asCompactedArray(fallback);
  // preference for kind
  if (kind) {
    // Either -
    // 1. --rothko-info-400
    if (scale) {
      return varFormat(`${PREFIX}-${kind}-${scale}`, ...fallbacks);
    }
    // 2. --rothko-info-foreground
    if (category === 'foreground') {
      return varFormat(`${PREFIX}-${kind}-${category}`, ...fallbacks);
    }
    // 3. --rothko-info
    return varFormat(`${PREFIX}-${kind}`, ...fallbacks);
  }

  const cssVariable = compact([PREFIX, element, category, focused && 'focus']).join('-');
  return varFormat(cssVariable, ...fallbacks);
};

const varFormat = (...vals: (Falsy | string)[]) => {
  return `var(${compact(vals).join(', ')})`;
};
