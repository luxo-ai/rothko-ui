import { Container, Typography } from '@rothko-ui/ui';
import React from 'react';
import styles from './Cards.module.scss';
import type { CodeSnippetProps } from './CodeSnippet';
import CodeSnippet from './CodeSnippet';
import type { PropMeta } from './PropsTable';
import PropsTable from './PropsTable';
import type { CardCopy } from './types';

type CardProps = {
  children: React.ReactNode;
  copy: CardCopy;
  propsMeta?: { meta: readonly PropMeta[]; description?: string };
  codeSnippet?: CodeSnippetProps;
};

const Card = ({ children, copy, propsMeta, codeSnippet }: CardProps) => {
  return (
    <div className={styles.componentCard}>
      <Typography.h1 className={styles.cardTitle}>{copy.title}</Typography.h1>
      <Typography.body className={styles.cardDescription}>{copy.description}</Typography.body>
      <div className={styles.section}>{children}</div>
      {codeSnippet && (
        <Container marginTop="2rem">
          <CodeSnippet {...codeSnippet} />
        </Container>
      )}
      {propsMeta && (
        <Container marginTop="2rem">
          <Typography.h2>Props</Typography.h2>
          {propsMeta.description && (
            <Typography.body className={styles.cardDescription}>
              {propsMeta.description}
            </Typography.body>
          )}
          <Container marginTop="2rem">
            <PropsTable propsMeta={propsMeta.meta} />
          </Container>
        </Container>
      )}
    </div>
  );
};

export default Card;
