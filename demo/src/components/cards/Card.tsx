import { Container, Flex, List, ListItem, Typography, useRothko } from '@rothko-ui/ui';
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
  propsMeta?: { meta: readonly PropMeta[]; titleOveride?: string };
  codeSnippet?: CodeSnippetProps;
};

const Card = ({ children, copy, propsMeta, codeSnippet }: CardProps) => {
  const { title, description, sections } = copy;
  return (
    <div className={styles.componentCard}>
      <div>
        <Typography.h1 className={styles.cardTitle}>{title}</Typography.h1>
        <Typography.body className={styles.bodySubtext}>{description} </Typography.body>
      </div>
      {sections &&
        Object.values(sections).map(section => (
          <div key={section.headerText}>
            <Section section={section} />
          </div>
        ))}
      <>{children}</>
      {codeSnippet && (
        <div>
          <CodeExample {...codeSnippet} />
        </div>
      )}
      {propsMeta && (
        <div>
          <Typography.h3>{propsMeta.titleOveride ?? 'Props'}</Typography.h3>
          <Container marginTop="2rem">
            <PropsTable propsMeta={propsMeta.meta} />
          </Container>
        </div>
      )}
    </div>
  );
};

type SectionProps = {
  section: SectionType;
};

const Section = ({ section }: SectionProps) => {
  const { mode } = useRothko();
  const { headerVariant, headerText, body } = section;

  const Body = ({ body }: { body: Body }) => {
    if (isString(body)) {
      return <Typography.body>{body}</Typography.body>;
    }
    if (React.isValidElement(body)) {
      return <>{body}</>;
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
    return <Section section={body as any} />;
  };

  const Header = Typography[headerVariant];

  return (
    <div>
      <Header
        bold={headerVariant === 'body'}
        style={
          headerVariant === 'body' ? { color: mode === 'light' ? '#888' : '#A7A7A7' } : undefined
        }
      >
        {headerText}
      </Header>
      <Body body={body} />
    </div>
  );
};

export default Card;
