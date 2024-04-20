import styled from 'styled-components';

import { vuar } from '../utils/vuar';
import { baseInputStyle } from '../../components/Input/styles';

const DropdownContainer = styled.div`
  -webkit-tap-highlight-color: transparent;
  ${baseInputStyle} // causing issues before, this helped

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 1rem;

  // prevent multi-select shrinkage
  // placeholder text (body) line-height + text margin + top padding + bottom padding + top border + bottom border
  min-height: calc(1.5rem + 2 * 0.125rem + 2 * 0.5rem + 2 * 2px);

  border: 0.125rem solid ${vuar({ category: 'border', fallback: '#000' })};

  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.empty {
    cursor: default;
  }
`;

export default DropdownContainer;
