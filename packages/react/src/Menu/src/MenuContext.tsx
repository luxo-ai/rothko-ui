import { createContext } from 'react';

type MenuContextType = {
  disabled: boolean;
  numberOfItems: number;
  scrollIntoView: (id: `#${string}`) => void;
};

const MenuContext = createContext<MenuContextType>({
  disabled: false,
  numberOfItems: 0,
  scrollIntoView: () => {},
});

export default MenuContext;
