import { Container, Flex } from '@rothko-ui/react';

import breadCrumbsCopy from './copy';
import { TSCode } from '../../Code';
import Card from '../Card';
import Example from '../Example';
import Props from '../Props';
import Usage from '../Usage';
import breadCrumbsProps from './props/breadcrumbs';
import breadCrumbsItemsProps from './props/breadcrumbsItem';
import Basic from './usage/Basic';
import { BASIC } from './usage/sourceCode';

const IMPORT = "import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/react';";

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/BreadCrumbs';

const BreadCrumbsCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={breadCrumbsCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth="15rem">
            <Basic />
          </Container>
        </Example>
      </Flex>
      <Props
        copy={[
          { title: 'BreadCrumbs Props', props: breadCrumbsProps },
          { title: 'BreadCrumbItem Props', props: breadCrumbsItemsProps },
        ]}
      />
    </Card>
  );
};

export default BreadCrumbsCard;
