import { Container, Flex } from '@rothko-ui/react';

import Card from '../Card';
import Example from '../Example';
import multiSelectCopy from './copy';
import multiDropdownProps from './props';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Clearable from './usage/Clearable';
import Disabled from './usage/Disabled';
import MenuPosition from './usage/MenuPosition';
import { BASIC, CLEARABLE, DISABLED, MENU_POSITION } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Select';

const IMPORT = "import { MultiSelet } from '@rothko-ui/react';";

const MultiSelectCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={multiSelectCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWidth}>
            <Basic />
          </Container>
        </Example>
        <Example title="Clearable" sourceCode={CLEARABLE}>
          <Container maxWidth={maxWidth}>
            <Clearable />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth={maxWidth}>
            <Disabled />
          </Container>
        </Example>
        <Example title="Menu Position" sourceCode={MENU_POSITION}>
          <Container maxWidth={maxWidth}>
            <MenuPosition />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: multiDropdownProps }} />
    </Card>
  );
};

export default MultiSelectCard;
