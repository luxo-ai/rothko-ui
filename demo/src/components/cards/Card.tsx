import isString from 'lodash/isString';
import Link from 'next/link';
import React from 'react';

import { Github } from '@rothko-ui/icons';
import { Container, Flex, List, ListItem, TabBar, Typography, useRothko } from '@rothko-ui/ui';

import { Code } from '../Code';
import styles from './Cards.module.scss';
import type { Body as BodyType, CardCopy, Section as SectionType } from './types';
import Markdown from './Markdown';

type CardProps = {
  children?: React.ReactNode;
  copy: CardCopy;
  codeUrl?: string;
};

const Card = ({ children, copy, codeUrl }: CardProps) => {
  const { mode } = useRothko();
  const { title, description, sections } = copy;
  return (
    <div className={styles.componentCard}>
      <header>
        <Typography.h1 className={styles.cardTitle}>{title}</Typography.h1>
        <Typography.body className={styles.bodySubtext}>{description}</Typography.body>
        {codeUrl && (
          <Container marginTop="1.5rem">
            <Link
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '0.4rem',
                width: 'fit-content',
              }}
              href={codeUrl}
              target="_bank"
              className="phantom-button"
            >
              <Github width={23} height={23} fill={mode === 'dark' ? '#fff' : undefined} />
              <Typography.bodySmall>View Source</Typography.bodySmall>
            </Link>
          </Container>
        )}
      </header>
      {sections && sections.map(section => <Section key={section.title} section={section} />)}
      {children && <>{children}</>}
    </div>
  );
};

type SectionProps = {
  section: SectionType;
};

const Section = ({ section }: SectionProps) => {
  const { variant: headerVariant = 'h3', title: headerText, subtitle, body } = section;

  const Body = ({ body }: { body: BodyType }) => {
    // string
    if (isString(body)) {
      return <Markdown>{body}</Markdown>;
    }
    // string[]
    if (Array.isArray(body) && typeof body[0] === 'string') {
      return (
        <List>
          {body.map(item => (
            <ListItem key={item as string}>{item as string}</ListItem>
          ))}
        </List>
      );
    }
    // Section
    if (!('kind' in body) && !Array.isArray(body)) {
      return <Section section={body} />;
    }
    // Section[]
    if (!('kind' in body) && Array.isArray(body)) {
      return (
        <Flex marginTop="1rem" flexDirection="column" rowGap="1.5rem">
          {body.map((item, idx) => (
            <div key={`${headerText || 'NONE'}_${idx}`}>
              <Section section={item as SectionType} />
            </div>
          ))}
        </Flex>
      );
    }
    // LazyComponent
    if (body.kind === 'lazyComponent') {
      const Component = body.component;
      return <Component />;
    }
    // Code
    if (body.kind === 'code' && !Array.isArray(body.code)) {
      return (
        <Code
          maxWidth={!['jsx', 'json'].includes(body.language) ? '28rem' : undefined}
          maxHeight={body.language !== 'jsx' ? '25rem' : undefined}
          language={body.language}
          displayLanguage={body.language !== 'jsx'}
          displayLineNumbers={body.language === 'jsx'}
          sourceCode={body.code}
        />
      );
    }
    // Code[]
    if (body.kind === 'code' && Array.isArray(body.code)) {
      return (
        <>
          <TabBar
            kind="success"
            initialTab="Example"
            style={{ maxWidth: '10rem' }}
            containerStyle={{ margin: '1rem 0 1rem 0' }}
            tabs={body.code.map(({ tag, text, icon: Icon }) => ({
              leftIcon: Icon && <Icon />,
              title: tag,
              key: text,
              render: (
                <Code
                  maxWidth={!['jsx', 'json'].includes(body.language) ? '28rem' : undefined}
                  maxHeight={body.language !== 'jsx' ? '25rem' : undefined}
                  language={body.language}
                  displayLanguage={body.language !== 'jsx'}
                  displayLineNumbers={body.language === 'jsx'}
                  sourceCode={text}
                />
              ),
            }))}
          />
        </>
      );
    }
    return null;
  };

  const Header = Typography[headerVariant];

  return (
    <section>
      {headerText && (
        <Container marginBottom="1rem">
          <Header bold={headerVariant === 'body'}>{headerText}</Header>
          {subtitle && <Typography.body style={{ margin: '0.5rem 0' }}>{subtitle}</Typography.body>}
        </Container>
      )}
      <Body body={body} />
    </section>
  );
};

export default Card;
