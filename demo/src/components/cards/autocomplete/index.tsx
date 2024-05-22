import { Container, Flex } from '@rothko-ui/ui';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import Usage from '../Usage';
import autocompleteCopy from './copy';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import MenuVariant from './usage/MenuVariant';
import RenderOption from './usage/RenderOption';
import { BASIC, DISABLED, MENU_VARIANT } from './usage/sourceCode';
import Props from '../Props';
import autocompleteProps from './props';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Autocomplete';

const IMPORT = "import { Autocomplete } from '@rothko-ui/ui';";

const SingleDropdownCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={autocompleteCopy}>
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
        <Example title="Menu Variant" sourceCode={MENU_VARIANT}>
          <Container maxWidth={maxWith}>
            <MenuVariant />
          </Container>
        </Example>
        <Example title="Render Option" sourceCode={MENU_VARIANT}>
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
      <Props copy={{ props: autocompleteProps }} />
    </Card>
  );
};

export default SingleDropdownCard;
