import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import Example from '../Example';
import skeletonCopy from './copy';
import skeletonProps from './props';
import Import from '../Import';
import Props from '../Props';
import Usage from '../Usage';
import SkeletonBox from './usage/SkeletonBox';
import SkeletonBoxWithLabel from './usage/SkeletonBoxWithLabel';
import SkeletonBuilder from './usage/SkeletonBuilder';
import { SKELETON_BOX_WITH_LABEL, SKELETON_BOX, SKELETON_BUILDER } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Skeleton';

const IMPORT_GLOBAL = "import { SkeletonBoxWithLabel, SkeletonBuilder } from '@rothko-ui/react';";
const IMPORT_SINGLE =
  "import { SkeletonBoxWithLabel, SkeletonBuilder } from '@rothko-ui/skeleton';";

const SkeletonCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '26rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={skeletonCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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
