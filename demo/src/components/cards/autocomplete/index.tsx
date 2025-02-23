import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import Example from '../Example';
import Usage from '../Usage';
import autocompleteCopy from './copy';
import Import from '../Import';
import Props from '../Props';
import autocompleteProps from './props';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import MenuVariant from './usage/MenuVariant';
import RenderOption from './usage/RenderOption';
import { BASIC, DISABLED, MENU_VARIANT } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Autocomplete';

const IMPORT_GLOBAL = "import { Autocomplete } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Autocomplete } from '@rothko-ui/autocomplete';";

const SingleDropdownCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={autocompleteCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
