import { Container, Flex } from '@rothko-ui/ui';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import skeletonCopy from './copy';
import skeletonProps from './props';
import SkeletonBoxWithLabel from './usage/SkeletonBoxWithLabel';
import SkeletonBuilder from './usage/SkeletonBuilder';
import SkeletonBox from './usage/SkeletonBox';
import { SKELETON_BOX_WITH_LABEL, SKELETON_BOX, SKELETON_BUILDER } from './usage/sourceCode';
import Props from '../Props';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Skeleton';

const IMPORT = "import { SkeletonBoxWithLabel } from '@rothko-ui/ui';";

const SkeletonCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={skeletonCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example title="Box with Label" sourceCode={SKELETON_BOX_WITH_LABEL}>
          <Container maxWidth={maxWith}>
            <SkeletonBoxWithLabel />
          </Container>
        </Example>
        <Example title="Box" sourceCode={SKELETON_BOX}>
          <Container maxWidth={maxWith}>
            <SkeletonBox />
          </Container>
        </Example>
        <Example title="Custom" sourceCode={SKELETON_BUILDER}>
          <Container maxWidth={maxWith}>
            <SkeletonBuilder />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: skeletonProps }} />
    </Card>
  );
};

export default SkeletonCard;
