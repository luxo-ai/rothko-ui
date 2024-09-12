import React, { useContext } from 'react';
import Typography from '../../components/Typography/Typography';
import styles from './Menu.module.scss';
import MenuContext from './MenuContext';

type MenuEmptyProps = {
  children?: React.ReactNode;
};

const MenuEmpty = ({ children }: MenuEmptyProps) => {
  const { numberOfItems } = useContext(MenuContext);
  if (numberOfItems > 1) return null;
  return typeof children === 'string' ? (
    <Typography.body className={styles['menu__empty']}>{children}</Typography.body>
  ) : (
    <>{children}</>
  );
};

export default MenuEmpty;
