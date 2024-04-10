import { Container, Flex } from '@rothko-ui/ui';

import { BASIC, CLEARABLE, DISABLED, MENU_POSITION, SEARCHABLE } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Clearable from './usage/Clearable';
import Disabled from './usage/Disabled';
import dropdownCopy from './copy';
import dropdownProps from './props';
import Example from '../Example';
import MenuPosition from './usage/MenuPosition';
import Props from '../Props';
import Seachable from './usage/Searchable';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Dropdown';

const IMPORT = "import { Dropdown } from '@rothko-ui/ui';";

// change postfix/prefix with "onRenderSelected"

const SingleDropdownCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={dropdownCopy}>
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
        <Example title="Searchable" sourceCode={SEARCHABLE}>
          <Container maxWidth={maxWith}>
            <Seachable />
          </Container>
        </Example>
        <Example title="Clearable" sourceCode={CLEARABLE}>
          <Container maxWidth={maxWith}>
            <Clearable />
          </Container>
        </Example>
        <Example title="Menu Position" sourceCode={MENU_POSITION}>
          <Container maxWidth={maxWith}>
            <MenuPosition />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: dropdownProps }} />
    </Card>
  );
};

export default SingleDropdownCard;
