import { Flex, FlexItem, TabBar, Typography } from '@rothko-ui/ui';

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
          <Typography.h5>{title}</Typography.h5>
          {subTitle && <Typography.body>{subTitle}</Typography.body>}
        </FlexItem>
      )}
      <FlexItem>
        <TabBar
          kind="success"
          initialTab="Example"
          style={{ maxWidth: '10rem' }}
          containerStyle={{ margin: '1rem 0 1rem 0' }}
          tabs={[
            {
              title: 'Example',
              key: 'Example',
              render: children,
            },
            {
              title: 'Code',
              key: 'Code',
              render: <JSXCode maxWidth="52rem" sourceCode={sourceCode} />,
            },
          ]}
        />
      </FlexItem>
    </Flex>
  );
};

export default Example;
