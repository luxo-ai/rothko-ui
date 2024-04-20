import styled from 'styled-components';

import ItemText from '../ItemText';

const NoResultsText = styled(ItemText).attrs({ as: 'p' })`
  text-align: center;
  padding: 1rem;
`;

export default NoResultsText;
