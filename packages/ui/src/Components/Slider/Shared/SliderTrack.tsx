import styled from 'styled-components';

const SliderTrackDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 1px;
  background: var(--color-border, #000);
  border-radius: 2px;
  user-select: none;
  z-index: 0;
`;

export default SliderTrackDiv;
