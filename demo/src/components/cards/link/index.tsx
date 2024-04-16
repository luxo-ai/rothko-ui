import { Container, Flex } from '@rothko-ui/ui';

import { BASIC, UNDERLINE, WITH_KIND } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Example from '../Example';
import linkCopy from './copy';
import Usage from '../Usage';
import Underline from './usage/Underline';
import WithKind from './usage/WithKind';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Link';

const IMPORT = "import { Link } from '@rothko-ui/ui';";

const LinkCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '30rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={linkCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWith}>
            <Basic />
          </Container>
        </Example>
        <Example title="Underline" sourceCode={UNDERLINE}>
          <Underline />
        </Example>
        <Example title="With Kind" sourceCode={WITH_KIND}>
          <WithKind />
        </Example>
      </Flex>
    </Card>
  );
};

export default LinkCard;
