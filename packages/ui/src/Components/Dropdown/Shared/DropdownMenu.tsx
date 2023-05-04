import styled from 'styled-components';
import { MenuBase } from '../../../Library/Common';

const DropdownMenu = styled(MenuBase)`
  max-height: 13rem;
  z-index: 10;
  background-color: var(--color-background, #fff);

  & li {
    &:hover,
    &:focus,
    &.selected {
      background-color: var(--dropdown-background-selected, #eeeeee);
    }
  }
`;

export default DropdownMenu;
