import { Container, Flex } from '@rothko-ui/ui';

import { BASIC, DISABLED, VARIANT } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Variant from './usage/Variant';
import Disabled from './usage/Disabled';
import Card from '../Card';
import Example from '../Example';
import inputCopy from './copy';
import Usage from '../Usage';
import Props from '../Props';
import inputProps from './props';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Input';

const IMPORT = "import { Input } from '@rothko-ui/ui';";

const InputCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '30rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={inputCopy}>
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
        <Example title="Variant" sourceCode={VARIANT}>
          <Flex flexDirection="column" gap="1.25rem" maxWidth={maxWith}>
            <Variant />
          </Flex>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth={maxWith}>
            <Disabled />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: inputProps }} />
    </Card>
  );
};

export default InputCard;
