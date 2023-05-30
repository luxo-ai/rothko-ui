import { Container, Flex, Tag } from '@rothko-ui/ui';
import { useReducer } from 'react';

import { CodeLanguage } from '../CodeExample';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import TagCustomizations, { customizationsReducer } from './Customizations';
import tagCopy from './copy';
import tagProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { Tag } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [closed, setClosed] = useState<boolean>(false);

  return (
    <Tag onClose={() => setClosed(true)} appearance="filled" kind="danger">
      example tag
    </Tag>
  );
}
`,
  [CodeLanguage.JS]: `
import React from 'react';
import { Tag } from '@rothko-ui/ui';

const Example = () => {
  const [closed, setClosed] = useState(false);

  return (
    <Tag onClose={() => setClosed(true)} appearance="filled" kind="danger">
      example tag
    </Tag>
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
      <Container as="section" maxWidth={isMobileOrTablet ? undefined : '26rem'}>
        <Flex columnGap="1rem">
          <Tag appearance="filled" kind={kind}>
            filled tag
          </Tag>
          <Tag appearance="outline" kind={kind}>
            outline tag
          </Tag>
          <Tag onClose={() => alert('close')} appearance="filled" kind={kind}>
            closeable tag
          </Tag>
        </Flex>
      </Container>
      <Container as="section" maxWidth="26rem">
        <TagCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default TagCard;
