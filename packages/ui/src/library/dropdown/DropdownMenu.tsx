import React from 'react';
import styled from 'styled-components';

import Menu from '../Menu';

const StyledDropdownMenu = styled(Menu)`
  max-height: 13rem;
  z-index: 10;
`;

type DropdownMenuProps = {
  id?: string;
  reverse?: boolean;
  children?: React.ReactNode;
  role?: React.AriaRole;
};

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ id, reverse, children }, ref) => {
    return (
      <StyledDropdownMenu
        id={id}
        ref={ref}
        // tab index is needed to make the menu focusable via keyboard
        tabIndex={-1}
        $reverse={reverse}
        data-rothko-body-scroll-lock-ignore
      >
        {children}
      </StyledDropdownMenu>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
