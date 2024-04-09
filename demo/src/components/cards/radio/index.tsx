import { Container, Flex, Typography } from '@rothko-ui/ui';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import radioCopy from './copy';
import radioProps from './props';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import MaxColumn from './usage/MaxColumn';
import { BASIC, DISABLED, MAX_COLUMN } from './usage/sourceCode';
import Props from '../Props';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Radio';

const IMPORT = "import { RadioGroup } from '@rothko-ui/ui';";

const RadioGroupCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={radioCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Typography.h3>Usage</Typography.h3>
        <Container maxWidth="32rem">
          <TSCode code={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWidth}>
            <Basic />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth={maxWidth}>
            <Disabled />
          </Container>
        </Example>
        <Example title="Menu Position" sourceCode={MAX_COLUMN}>
          <Container maxWidth={maxWidth}>
            <MaxColumn />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: radioProps }} />
    </Card>
  );
};

export default RadioGroupCard;
