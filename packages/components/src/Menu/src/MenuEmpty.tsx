import React, { useContext } from 'react';
import styles from './Menu.module.scss';
import MenuContext from './MenuContext';
import { scopedClasses } from '@rothko-ui/system';

const sc = scopedClasses(styles);

type MenuEmptyProps = {
  children?: React.ReactNode;
};

const MenuEmpty = ({ children }: MenuEmptyProps) => {
  const { numberOfItems } = useContext(MenuContext);
  if (numberOfItems > 1) return null;
  return typeof children === 'string' ? (
    <p className={sc('menu__empty', 'text-center')}>{children}</p>
  ) : (
    <div className={sc('menu__empty')}>{children}</div>
  );
};

export default MenuEmpty;
