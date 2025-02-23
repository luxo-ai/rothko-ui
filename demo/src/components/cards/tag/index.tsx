import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
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
import Import from '../Import';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Tag';

const IMPORT_GLOBAL = "import { Tag } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Tag } from '@rothko-ui/tag';";

const TagCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={tagCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
