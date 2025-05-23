import { Heading3, Tab, Tabs } from '@rothko-ui/react';
import NextLink from 'next/link';

import styles from './Card.module.scss';
import { TSCode } from '../Code';
import { Container } from '../container';

type ImportProps = {
  single: string;
  global: string;
};

const Import = ({ single, global }: ImportProps) => (
  <div>
    <Heading3 className={styles.hashLinkableHeader} id="import">
      <NextLink href="#import" scroll>
        Import
      </NextLink>
    </Heading3>
    <Container maxWidth="34rem">
      <Tabs
        kind="primary"
        styles={{ tabs: { maxWidth: '10rem', marginTop: '1rem' }, tab: { margin: '0.75rem 0' } }}
      >
        <Tab title="Global" $key="global">
          <TSCode themeOverride="palenight" testing sourceCode={global} />
        </Tab>
        <Tab title="Single" $key="single">
          <TSCode themeOverride="palenight" testing sourceCode={single} />
        </Tab>
      </Tabs>
    </Container>
  </div>
);

export default Import;
