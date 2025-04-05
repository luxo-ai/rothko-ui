'use client';

import breadCrumbsCopy from './copy';
import breadCrumbsProps from './props/breadcrumbs';
import breadCrumbsItemsProps from './props/breadcrumbsItem';
import Basic from './usage/Basic';
import { BASIC } from './usage/sourceCode';

import { Card, Import, Props, Usage } from '@/components/card';
import { Container } from '@/components/container';
import Example from '@/components/Example';
import { Flex } from '@/components/flex';

const IMPORT_GLOBAL = "import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/breadcrumbs';";

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/BreadCrumbs';

const Page = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={breadCrumbsCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
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

export default Page;
