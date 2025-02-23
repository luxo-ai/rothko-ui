import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import Example from '../Example';
import radioCopy from './copy';
import { radioGroupProps, radioProps } from './props';
import Import from '../Import';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import MaxColumn from './usage/MaxColumn';
import { BASIC, DISABLED, MAX_COLUMN } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Radio';

const IMPORT_GLOBAL = "import { RadioGroup } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Radio } from '@rothko-ui/radio';";

const RadioGroupCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={radioCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
        <Example title="Max Column" sourceCode={MAX_COLUMN}>
          <Container maxWidth={maxWidth}>
            <MaxColumn />
          </Container>
        </Example>
      </Flex>
      <Props
        copy={[
          { props: radioGroupProps, title: 'RadioGroup Props' },
          { props: radioProps, title: 'Radio Props' },
        ]}
      />
    </Card>
  );
};

export default RadioGroupCard;
