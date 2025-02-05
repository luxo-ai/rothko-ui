import { Flex, FlexItem, Paragraph, Tabs, Tab, Heading5 } from '@rothko-ui/components';

import { JSXCode } from '../Code';

type CodeSnippetProps = {
  children: React.ReactElement;
  sourceCode: string;
  subTitle?: string;
  title?: string;
};

const Example = ({ title, sourceCode, subTitle, children }: CodeSnippetProps) => {
  return (
    <Flex flexDirection="column" rowGap="0.25rem">
      {title && (
        <FlexItem>
          <Heading5>{title}</Heading5>
          {subTitle && <Paragraph>{subTitle}</Paragraph>}
        </FlexItem>
      )}
      <FlexItem>
        <Tabs
          kind="success"
          styles={{
            tabs: { maxWidth: '10rem' },
            tab: { margin: '1rem 0 1rem 0' },
          }}
        >
          <Tab title="Example" $key="Example">
            {children}
          </Tab>
          <Tab title="Code" $key="Code">
            <JSXCode maxWidth="52rem" sourceCode={sourceCode} />
          </Tab>
        </Tabs>
      </FlexItem>
    </Flex>
  );
};

export default Example;
