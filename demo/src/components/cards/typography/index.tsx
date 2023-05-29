import { Grid, Tag, Typography } from '@rothko-ui/ui';
import React from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import typographyCopy from './copy';
import typographyProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { Typography } from '@rothko-ui/ui';

  type ExampleProps = {
    text: string
  }

  const Example = ({ text }: ExampleProps) => {
      return (
        <Typography.h1>{text} in h1!</Typography.h1>
      );
  }
`,
  [CodeLanguage.JS]: `
  import { Typography } from '@rothko-ui/ui';

  const Example = ({ text }) => {
    return <Typography.h1>{text} in h1!</Typography.h1>
  }
`,
};

const TypographyCard = () => {
  return (
    <Card
      copy={typographyCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: typographyProps }}
    >
      <Grid
        maxWidth="40rem"
        gridTemplateColumns="1fr 1fr"
        columnGap="3rem"
        gridAutoRows="4rem"
        alignItems="center"
      >
        <Typography.h3>Font Size</Typography.h3>
        <Typography.h3>Preview</Typography.h3>
        <Tag kind="success" appearance="outline">
          <Typography.caption>2.5rem</Typography.caption>
        </Tag>
        <Typography.h1>h1</Typography.h1>
        <Tag kind="success" appearance="outline">
          <Typography.caption>2.25rem</Typography.caption>
        </Tag>
        <Typography.h2>h2</Typography.h2>
        <Tag kind="success" appearance="outline">
          <Typography.caption>2rem</Typography.caption>
        </Tag>
        <Typography.h3>h3</Typography.h3>
        <Tag kind="success" appearance="outline">
          <Typography.caption>1.75rem</Typography.caption>
        </Tag>
        <Typography.h4>h4</Typography.h4>
        <Tag kind="success" appearance="outline">
          <Typography.caption>1.5rem</Typography.caption>
        </Tag>
        <Typography.h5>h5</Typography.h5>
        <Tag kind="success" appearance="outline">
          <Typography.caption>1.25rem</Typography.caption>
        </Tag>
        <Typography.h6>h6</Typography.h6>
        <Tag kind="success" appearance="outline">
          <Typography.caption>1rem</Typography.caption>
        </Tag>
        <Typography.body>body</Typography.body>
        <Tag kind="success" appearance="outline">
          <Typography.caption>0.875rem</Typography.caption>
        </Tag>
        <Typography.bodySmall>bodySmall</Typography.bodySmall>
        <Tag kind="success" appearance="outline">
          <Typography.caption>0.75rem</Typography.caption>
        </Tag>
        <Typography.label>LABEL</Typography.label>
        <Tag kind="success" appearance="outline">
          <Typography.caption>0.75rem</Typography.caption>
        </Tag>
        <Typography.caption>caption</Typography.caption>
      </Grid>
    </Card>
  );
};

export default TypographyCard;
