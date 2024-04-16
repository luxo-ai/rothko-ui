import styled from 'styled-components';
import Typography from '../components/Typography/Typography';

const ItemText = styled(Typography.inlineBody)<{ $placeHolder?: boolean }>`
  user-select: none;
  opacity: ${({ $placeHolder }) => ($placeHolder ? 0.75 : 1)};
`;

export default ItemText;
