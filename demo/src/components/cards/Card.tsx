import { Container, Flex, List, ListItem, Typography } from '@rothko-ui/ui';
import isString from 'lodash/isString';
import React from 'react';
import styles from './Cards.module.scss';
import type { CodeSnippetProps } from './CodeExample';
import CodeExample from './CodeExample';
import type { PropMeta } from './PropsTable';
import PropsTable from './PropsTable';
import type { Body, CardCopy, Section as SectionType } from './types';

type CardProps = {
  children: React.ReactNode;
  copy: CardCopy;
  propsMeta?: { meta: readonly PropMeta[]; description?: string };
  codeSnippet?: CodeSnippetProps;
};

const Card = ({ children, copy, propsMeta, codeSnippet }: CardProps) => {
  const { title, description, sections } = copy;
  return (
    <div className={styles.componentCard}>
      <Typography.h1 className={styles.cardTitle}>{title}</Typography.h1>
      <Typography.body className={styles.cardDescription}>{description}</Typography.body>
      {sections && (
        <Container marginTop="2rem">
          {Object.values(sections).map(section => (
            <div className={styles.section} key={section.headerText}>
              <Section section={section} />
            </div>
          ))}
        </Container>
      )}
      <div className={styles.section}>{children}</div>
      {codeSnippet && (
        <Container marginTop="2rem">
          <CodeExample {...codeSnippet} />
        </Container>
      )}
      {propsMeta && (
        <Container marginTop="2rem">
          <Typography.h3>Props</Typography.h3>
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

type SectionProps = {
  section: SectionType;
};

const Section = ({ section }: SectionProps) => {
  const { headerVariant, headerText, body } = section;

  const Body = ({ body }: { body: Body }) => {
    if (isString(body)) {
      return <Typography.body>{body}</Typography.body>;
    }
    if (Array.isArray(body)) {
      if (typeof body[0] !== 'string') {
        return (
          <Flex marginTop="1rem" flexDirection="column" rowGap="1.5rem">
            {body.map((item, idx) => (
              <div key={`${headerText}_${idx}`}>
                <Section section={item as SectionType} />
              </div>
            ))}
          </Flex>
        );
      }
      return (
        <List>
          {body.map(item => (
            <ListItem key={item as string}>{item as string}</ListItem>
          ))}
        </List>
      );
    }
    return <Section section={body} />;
  };

  const Header = Typography[headerVariant];

  return (
    <div>
      <Header bold={headerVariant === 'body'}>{headerText}</Header>
      <Body body={body} />
    </div>
  );
};

export default Card;
