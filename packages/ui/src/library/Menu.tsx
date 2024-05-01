import styled, { css } from 'styled-components';
import { vuar } from './utils/vuar';
import { hideChromeBrowserOutline } from './Styles';

const Menu = styled.div<{ $reverse?: boolean }>`
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  ${hideChromeBrowserOutline}

  background-color: ${vuar({ element: 'dropdown', category: 'background', fallback: '#fff' })};

  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;

  ${({ $reverse }) =>
    $reverse &&
    css`
      top: auto;
      bottom: calc(100% + 0.25rem);
    `}

  border-radius: 0.125rem;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    outline: none;
    cursor: pointer;
    padding: 0.75rem 1rem;

    &:hover,
    &:focus,
    &.selected {
      background-color: ${vuar({
        element: 'dropdown-option',
        category: 'background',
        focused: true,
        fallback: '#eee',
      })};
    }
  }
`;

export default Menu;
