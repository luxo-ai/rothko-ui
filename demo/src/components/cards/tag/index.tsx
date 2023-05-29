/* eslint-disable no-console */
import { Container, Flex, MaxWidth, Tag } from '@rothko-ui/ui';
import React, { useReducer } from 'react';

import { CodeLanguage } from '../CodeExample';

import Card from '../Card';
import tagCopy from './copy';
import tagProps from './props';
import TagCustomizations, { customizationsReducer } from './Customizations';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
  [CodeLanguage.JS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
};

const TagCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [state, dispatch] = useReducer(customizationsReducer, {
    kind: 'info',
  });
  const { kind } = state;
  return (
    <Card
      copy={tagCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: tagProps }}
    >
      <MaxWidth maxW="26rem">
        <TagCustomizations state={state} dispatch={dispatch} />
      </MaxWidth>
      <Container maxWidth={isMobileOrTablet ? undefined : '26rem'} marginTop="2rem">
        <Flex columnGap="1rem">
          <Tag appearance="filled" kind={kind}>
            my first tag
          </Tag>
          <Tag onClose={() => alert('close')} appearance="filled" kind={kind}>
            closeable tag
          </Tag>
        </Flex>
      </Container>
    </Card>
  );
};

export default TagCard;
