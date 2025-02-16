import React, { useContext } from 'react';

import MenuContext from './MenuContext';
import { itemBase } from './styles';

type MenuEmptyProps = {
  children?: React.ReactNode;
  className?: string;
};

const MenuEmpty = ({ children, className }: MenuEmptyProps) => {
  const { numberOfItems } = useContext(MenuContext);
  if (numberOfItems > 1) return null;
  return typeof children === 'string' ? (
    <p className={itemBase('text-center p-[1rem] rothko-font-light', className)}>{children}</p>
  ) : (
    <div className={itemBase('text-center p-[1rem] rothko-font-light', className)}>{children}</div>
  );
};

export default MenuEmpty;
