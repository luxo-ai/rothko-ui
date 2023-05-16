import {
  Container,
  Grid,
  Hr,
  MaxWidth,
  OptionGroup,
  Tag,
  Typography,
  useRothko,
} from '@rothko-ui/ui';
import type { Nullable } from '@rothko-ui/utils';
import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';
import styles from '../Cards.module.scss';
import typographyCopy from './copy';
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

enum CodeLanguage {
  TS,
  JS,
}

const codeBlockTsx = `
  import { Typography } from '@rothko-ui/ui';

  type ExampleProps = {
    text: string
  }

  const Example = ({ text }: ExampleProps) => {
      return (
        <Typography.h1>{text} in h1!</Typography.h1>
      );
  }
`;

const codeBlockJsx = `
  import { Typography } from '@rothko-ui/ui';

  const Example = ({ text }) => {
    return <Typography.h1>{text} in h1!</Typography.h1>
  }
`;

function PropsTable() {
  return (
    <Table style={{ borderColor: '#3B3B3B' }}>
      <Thead>
        <Tr>
          <Th>Event</Th>
          <Th>Date</Th>
          <Th>Location</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Tablescon</Td>
          <Td>9 April 2019</Td>
          <Td>East Annex</Td>
        </Tr>
        <Tr>
          <Td>Capstone Data</Td>
          <Td>19 May 2019</Td>
          <Td>205 Gorgas</Td>
        </Tr>
        <Tr>
          <Td>Tuscaloosa D3</Td>
          <Td>29 June 2019</Td>
          <Td>Github</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

const exampleLookup: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: codeBlockTsx,
  [CodeLanguage.JS]: codeBlockJsx,
};

type IdkProps = {
  code: string;
};
// ADD COPY HERE
const Idk = ({ code }: IdkProps) => {
  const { mode } = useRothko();
  return (
    <Highlight
      theme={mode === 'dark' ? themes.nightOwl : themes.nightOwlLight}
      code={code}
      language="tsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style, overflow: 'scroll' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const TypographyCard = () => {
  const [expanded, setExpanded] = useState<CodeLanguage | null>(null);
  return (
    <div className={styles.componentCard}>
      <Typography.h1 className={styles.cardTitle}>{typographyCopy.title}</Typography.h1>
      <Typography.body className={styles.cardDescription}>
        {typographyCopy.description}
      </Typography.body>
      <div className={styles.section}>
        <Grid gridTemplateColumns="20rem 1fr" gridAutoRows="4rem" alignItems="center">
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
        <Container marginTop="1rem">
          <MaxWidth maxW="10rem">
            <OptionGroup
              maxCol={2}
              kind="info"
              optionGap="0.25rem"
              size="m"
              value={expanded}
              options={[
                { id: CodeLanguage.TS, label: 'TS' },
                { id: CodeLanguage.JS, label: 'JS' },
              ]}
              onChange={v => setExpanded(v === expanded ? null : v)}
            />
          </MaxWidth>
        </Container>
        {expanded !== null && <Idk code={exampleLookup[expanded]} />}
        <Hr />
        <Typography.h2>Props</Typography.h2>
        <Typography.body className={styles.cardDescription}>
          {typographyCopy.description}
        </Typography.body>
        <Container background="#ccc">
          <PropsTable />
        </Container>
      </div>
    </div>
  );
};

export default TypographyCard;
