import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import tagCopy from './copy';
import tagProps from './props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Closeable from './usage/Closeable';
import { BASIC, CLOSEABLE, WITH_KIND } from './usage/sourceCode';
import Variant from './usage/Variant';
import WithKind from './usage/WithKind';
import { VARIANT } from '../button/usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Tag';

const IMPORT = "import { Tag } from '@rothko-ui/react';";

const TagCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={tagCopy}>
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
        <Example title="Variant" sourceCode={VARIANT}>
          <Flex gap="0.75rem" maxWidth={maxWidth}>
            <Variant />
          </Flex>
        </Example>
        <Example title="Closeable" sourceCode={CLOSEABLE}>
          <Container maxWidth={maxWidth}>
            <Closeable />
          </Container>
        </Example>
        <Example title="With Kind" sourceCode={WITH_KIND}>
          <Flex flexDirection="column" gap="0.75rem" maxWidth={maxWidth}>
            <WithKind />
          </Flex>
        </Example>
      </Flex>
      <Props copy={{ props: tagProps }} />
    </Card>
  );
};

export default TagCard;
