import { Container, Typography } from '@rothko-ui/ui';
import React from 'react';
import styles from './Cards.module.scss';
import type { CodeSnippetProps } from './CodeExample';
import CodeExample from './CodeExample';
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
        <Container marginTop="3rem">
          <CodeExample {...codeSnippet} />
        </Container>
      )}
      {propsMeta && (
        <Container marginTop="3rem">
          <Typography.h3>Props</Typography.h3>
          {propsMeta.description && (
            <Typography.body className={styles.cardDescription}>
              {propsMeta.description}
            </Typography.body>
          )}
          <Container marginTop="3rem">
            <PropsTable propsMeta={propsMeta.meta} />
          </Container>
        </Container>
      )}
    </div>
  );
};

export default Card;
