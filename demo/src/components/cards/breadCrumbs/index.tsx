import { Container, Flex, Typography } from '@rothko-ui/ui';

import { BASIC } from './usage/sourceCode';
import { TSCode } from '../../Code';
import Basic from './usage/Basic';
import breadCrumbItemProps from './props';
import breadCrumbsCopy from './copy';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';

const IMPORT = "import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';";

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/Components/BreadCrumbs';

const BreadCrumbsCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={breadCrumbsCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Typography.h3>Usage</Typography.h3>
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth="15rem">
            <Basic />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: breadCrumbItemProps }} />
    </Card>
  );
};

export default BreadCrumbsCard;
