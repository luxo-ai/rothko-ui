import { Container, Flex, Grid } from '@rothko-ui/components';

import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Accessory from './usage/Accessory';
import Appearance from './usage/Appearance';
import buttonCopy from './copy';
import buttonProps from './props';
import Card from '../Card';
import Disabled from './usage/Disabled';
import Example from '../Example';
import Loading from './usage/Loading';
import Shape from './usage/Variant';
import Size from './usage/Size';
import WithKind from './usage/WithKind';
import {
  ACCESSORY,
  APPEARANCE,
  DISABLED,
  LOADING,
  VARIANT,
  SIZE,
  WITH_KIND,
} from './usage/sourceCode';
import Props from '../Props';
import Usage from '../Usage';

const IMPORT = "import { Button } from '@rothko-ui/components';";

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/components/src/Button';

const ButtonCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const gridTemplateColumns = `repeat(${isMobileOrTablet ? 2 : 3}, 9rem)`;

  return (
    <Card codeUrl={GITHUB_URL} copy={buttonCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example title="With Kind" sourceCode={WITH_KIND}>
          <Grid gridTemplateColumns={gridTemplateColumns} rowGap="1rem" columnGap="0.75rem">
            <WithKind />
          </Grid>
        </Example>
        <Example title="Appearance" sourceCode={APPEARANCE}>
          <Flex gap="1rem" maxWidth="22rem">
            <Appearance />
          </Flex>
        </Example>
        <Example title="Variant" sourceCode={VARIANT}>
          <Flex gap="1rem" maxWidth="22rem">
            <Shape />
          </Flex>
        </Example>
        <Example title="Size" sourceCode={SIZE}>
          <Flex flexDirection="column" gap="1.25rem" maxWidth="15rem">
            <Size />
          </Flex>
        </Example>
        <Example title="Loading" sourceCode={LOADING}>
          <Container maxWidth="15rem">
            <Loading />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container maxWidth="15rem">
            <Disabled />
          </Container>
        </Example>
        <Example title="Accessory" sourceCode={ACCESSORY}>
          <Flex flexDirection="column" gap="1.25rem" maxWidth="15rem">
            <Accessory />
          </Flex>
        </Example>
      </Flex>
      <Props copy={{ props: buttonProps }} />
    </Card>
  );
};

export default ButtonCard;
