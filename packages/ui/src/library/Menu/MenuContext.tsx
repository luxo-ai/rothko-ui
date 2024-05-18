import { noop } from '@rothko-ui/utils';
import { createContext } from 'react';

type MenuContextType = {
  disabled: boolean;
  numberOfItems: number;
  scrollIntoView: (id: `#${string}`) => void;
};

const MenuContext = createContext<MenuContextType>({
  disabled: false,
  numberOfItems: 0,
  scrollIntoView: noop,
});

export default MenuContext;
