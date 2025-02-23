import { Container, Flex } from '@rothko-ui/react';

import Card from '../Card';
import Example from '../Example';
import multiSelectCopy from './copy';
import multiSelectProps from './props';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Import from '../Import';
import Props from '../Props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Clearable from './usage/Clearable';
import Disabled from './usage/Disabled';
import MenuPosition from './usage/MenuPosition';
import { BASIC, CLEARABLE, DISABLED, MENU_POSITION } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Select';

const IMPORT_GLOBAL = "import { MultiSelect } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { MultiSelect } from '@rothko-ui/select';";

const MultiSelectCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={multiSelectCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
      <Props copy={{ props: multiSelectProps }} />
    </Card>
  );
};

export default MultiSelectCard;
