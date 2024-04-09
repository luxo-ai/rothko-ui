import { Container, Flex, Typography } from '@rothko-ui/ui';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import skeletonCopy from './copy';
import skeletonProps from './props';
import Basic from './usage/Basic';
import { BASIC } from './usage/sourceCode';
import Props from '../Props';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/Skeleton';

const IMPORT = "import { SkeletonBoxWithLabel } from '@rothko-ui/ui';";

const SkeletonCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={skeletonCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Typography.h3>Usage</Typography.h3>
        <Container maxWidth="32rem">
          <TSCode code={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWith}>
            <Basic />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: skeletonProps }} />
    </Card>
  );
};

export default SkeletonCard;
