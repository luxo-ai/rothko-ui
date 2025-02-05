import { Container, Flex } from '@rothko-ui/components';

import { BASIC, DISABLED, VARIANT } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import Card from '../Card';
import Example from '../Example';
import textareaCopy from './copy';
import Usage from '../Usage';
import Props from '../Props';
import textareaProps from './props';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/components/src/Input';

const IMPORT = "import { Textarea } from '@rothko-ui/components';";

const TextareaCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '30rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={textareaCopy}>
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
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth={maxWith}>
            <Disabled />
          </Container>
        </Example>
        <Props copy={{ props: textareaProps }} />
      </Flex>
    </Card>
  );
};

export default TextareaCard;
