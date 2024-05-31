import React from 'react';
import Menu from '../Menu/Menu';
import styles from './Dropdown.module.scss';
import type { MenuVariant, ScrollableHTMLElement } from '../Menu/types';

type DropdownMenuProps = {
  id?: string;
  variant?: MenuVariant;
  children?: React.ReactNode;
  open?: boolean;
};

const DropdownMenu = React.forwardRef<ScrollableHTMLElement, DropdownMenuProps>(
  ({ id, variant, children, open }, ref) => {
    return (
      <Menu
        id={id}
        ref={ref}
        open={open}
        variant={variant}
        className={styles['dropdown-menu']}
        data-rothko-body-scroll-lock-ignore
      >
        {children}
      </Menu>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
