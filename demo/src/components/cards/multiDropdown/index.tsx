import { Container, Flex } from '@rothko-ui/ui';

import { BASIC, CLEARABLE, DISABLED, MENU_POSITION } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Clearable from './usage/Clearable';
import Disabled from './usage/Disabled';
import Example from '../Example';
import MenuPosition from './usage/MenuPosition';
import multiDropdownCopy from './copy';
import multiDropdownProps from './props';
import Props from '../Props';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Dropdown';

const IMPORT = "import { MultiDropdown } from '@rothko-ui/ui';";

const MultiDropdownCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={multiDropdownCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
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
        <Example title="Clearable" sourceCode={CLEARABLE}>
          <Container maxWidth={maxWidth}>
            <Clearable />
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

export default MultiDropdownCard;
