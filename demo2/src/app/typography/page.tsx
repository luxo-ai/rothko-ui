'use client';

import {
  Tag,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
} from '@rothko-ui/react';

import typographyCopy from './copy';

import { Card, Import, Usage } from '@/components/card';
import { Flex } from '@/components/flex';
import { Grid } from '@/components/grid';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Typography';

const IMPORT_GLOBAL =
  "import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Paragraph, } from '@rothko-ui/react';";
const IMPORT_SINGLE =
  "import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Paragraph, } from '@rothko-ui/typography';";

const Page = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={typographyCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
      </Flex>
      <Grid
        maxWidth="40rem"
        gridTemplateColumns="1fr 1fr"
        columnGap="3rem"
        gridAutoRows="4rem"
        alignItems="center"
      >
        <Heading3>Font Size</Heading3>
        <Heading3>Preview</Heading3>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">2.5rem</Paragraph>
        </Tag>
        <Heading1>h1</Heading1>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">2.25rem</Paragraph>
        </Tag>
        <Heading2>h2</Heading2>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">2rem</Paragraph>
        </Tag>
        <Heading3>h3</Heading3>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">1.75rem</Paragraph>
        </Tag>
        <Heading4>h4</Heading4>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">1.5rem</Paragraph>
        </Tag>
        <Heading5>h5</Heading5>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">1.25rem</Paragraph>
        </Tag>
        <Heading6>h6</Heading6>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">1.25rem</Paragraph>
        </Tag>
        <Paragraph size="l">paragraph large</Paragraph>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">1rem</Paragraph>
        </Tag>
        <Paragraph>paragraph</Paragraph>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">0.875rem</Paragraph>
        </Tag>
        <Paragraph size="s">paragraph small</Paragraph>
        <Tag kind="success" variant="outline">
          <Paragraph size="xs">0.75rem</Paragraph>
        </Tag>
        <Paragraph size="xs">paragraph Xsmall</Paragraph>
      </Grid>
    </Card>
  );
};

export default Page;
