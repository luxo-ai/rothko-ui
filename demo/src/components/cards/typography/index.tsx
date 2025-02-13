import {
  Container,
  Flex,
  Grid,
  Tag,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
} from '@rothko-ui/components';

import { TSCode } from '../../Code';
import Card from '../Card';
import Props from '../Props';
import Usage from '../Usage';
import typographyCopy from './copy';
import typographyProps from './props';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/components/src/Typography';

const IMPORT =
  "import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Paragraph, } from '@rothko-ui/components';";

const TypographyCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={typographyCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
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
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">2.5rem</Paragraph>
        </Tag>
        <Heading1>h1</Heading1>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">2.25rem</Paragraph>
        </Tag>
        <Heading2>h2</Heading2>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">2rem</Paragraph>
        </Tag>
        <Heading3>h3</Heading3>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">1.75rem</Paragraph>
        </Tag>
        <Heading4>h4</Heading4>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">1.5rem</Paragraph>
        </Tag>
        <Heading5>h5</Heading5>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">1.25rem</Paragraph>
        </Tag>
        <Heading6>h6</Heading6>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">1.25rem</Paragraph>
        </Tag>
        <Paragraph size="l">paragraph large</Paragraph>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">1rem</Paragraph>
        </Tag>
        <Paragraph>paragraph</Paragraph>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">0.875rem</Paragraph>
        </Tag>
        <Paragraph size="s">paragraph small</Paragraph>
        <Tag kind="success" appearance="outline">
          <Paragraph size="xs">0.75rem</Paragraph>
        </Tag>
        <Paragraph size="xs">paragraph Xsmall</Paragraph>
      </Grid>
      <Props copy={{ props: typographyProps }} />
    </Card>
  );
};

export default TypographyCard;
