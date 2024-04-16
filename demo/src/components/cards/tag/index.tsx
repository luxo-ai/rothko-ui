import { Container, Flex } from '@rothko-ui/ui';

import { APPEARANCE } from '../button/usage/sourceCode';
import { BASIC, CLOSEABLE, WITH_KIND } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Appearance from './usage/Appearance';
import Basic from './usage/Basic';
import Card from '../Card';
import Closeable from './usage/Closeable';
import Example from '../Example';
import Props from '../Props';
import tagCopy from './copy';
import tagProps from './props';
import WithKind from './usage/WithKind';
import Usage from '../Usage';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Tag';

const IMPORT = "import { Tag } from '@rothko-ui/ui';";

const TagCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={tagCopy}>
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
        <Example title="Appearance" sourceCode={APPEARANCE}>
          <Container maxWidth={maxWidth}>
            <Appearance />
          </Container>
        </Example>
        <Example title="Closeable" sourceCode={CLOSEABLE}>
          <Container maxWidth={maxWidth}>
            <Closeable />
          </Container>
        </Example>
        <Example title="With Kind" sourceCode={WITH_KIND}>
          <Container maxWidth={maxWidth}>
            <WithKind />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: tagProps }} />
    </Card>
  );
};

export default TagCard;
