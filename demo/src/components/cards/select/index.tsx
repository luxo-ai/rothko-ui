import { Container, Flex } from '@rothko-ui/components';

import { BASIC, CLEARABLE, DISABLED, MENU_VARIANT, RENDER_OPTION } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Clearable from './usage/Clearable';
import Disabled from './usage/Disabled';
import RenderOption from './usage/RenderOption';
import selectCopy from './copy';
import dropdownProps from './props';
import Example from '../Example';
import MenuVariant from './usage/MenuVariant';
import Props from '../Props';
import Usage from '../Usage';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/components/src/Select';

const IMPORT = "import { Select } from '@rothko-ui/components';";

// change postfix/prefix with "onRenderSelected"

const SelectCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={selectCopy}>
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
        <Example title="Clearable" sourceCode={CLEARABLE}>
          <Container maxWidth={maxWith}>
            <Clearable />
          </Container>
        </Example>
        <Example title="Menu Variant" sourceCode={MENU_VARIANT}>
          <Container maxWidth={maxWith}>
            <MenuVariant />
          </Container>
        </Example>
        <Example title="Render Option" sourceCode={RENDER_OPTION}>
          <Container maxWidth={maxWith}>
            <RenderOption />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth={maxWith}>
            <Disabled />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: dropdownProps }} />
    </Card>
  );
};

export default SelectCard;
