import isString from 'lodash/isString';
import Link from 'next/link';
import React from 'react';

import { Github } from '@rothko-ui/icons';
import {
  Container,
  Flex,
  FlexItem,
  List,
  ListItem,
  TabBar,
  Typography,
  useRothko,
} from '@rothko-ui/ui';
import { asCompactedArray, toKebabCase } from '@rothko-ui/utils';

import { Code } from '../Code';
import styles from './Cards.module.scss';
import type { Body as BodyType, CCode, CardCopy, Section as SectionType } from './types';
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
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                columnGap: '0.4rem',
                width: 'fit-content',
              }}
              href={codeUrl}
              target="_bank"
              // fixes mobile flashing issue
              className="phantom-button"
            >
              <Github width={23} height={23} fill={mode === 'dark' ? '#fff' : undefined} />
              <Typography.bodySmall>View Source</Typography.bodySmall>
            </Link>
          </Container>
        )}
      </header>
      {sections &&
        sections.map((section, idx) => {
          const sectionKey = section.title || `${title}_${idx}`;
          return <Section sectionKey={sectionKey} key={sectionKey} section={section} />;
        })}
      {children && <>{children}</>}
    </div>
  );
};

type SectionProps = {
  style?: React.CSSProperties;
  sectionKey: string;
  section: SectionType;
};

const Section = ({ sectionKey, section }: SectionProps) => {
  const { variant: headerVariant = 'h3', title, subtitle, body } = section;

  const Body = ({ body }: { body: BodyType }) => {
    // string
    if (isString(body)) {
      return (
        <div style={{ marginTop: '0.5rem' }}>
          <Markdown>{body}</Markdown>
        </div>
      );
    }
    // string[]
    if (Array.isArray(body) && body.every(isString)) {
      return (
        <List>
          {body.map(item => (
            <ListItem key={item as string}>{item as string}</ListItem>
          ))}
        </List>
      );
    }
    // Code[]
    if (Array.isArray(body) && body.every((v): v is CCode => 'kind' in v && v.kind === 'code')) {
      return (
        <Flex flexDirection="column" rowGap="1rem">
          {asCompactedArray(body).map((item, idx) => {
            const subSectionKey = `${sectionKey}_${idx}`;
            return (
              <FlexItem key={subSectionKey}>
                {item.text && (
                  <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <Markdown>{item.text}</Markdown>
                  </div>
                )}
                <Code
                  marginTop="1rem"
                  maxWidth={!['jsx', 'json'].includes(item.language) ? '28rem' : undefined}
                  maxHeight={item.language !== 'jsx' ? '25rem' : undefined}
                  language={item.language}
                  displayLanguage={item.language !== 'jsx'}
                  displayLineNumbers={item.language === 'jsx'}
                  sourceCode={item.code}
                />
              </FlexItem>
            );
          })}
        </Flex>
      );
    }
    // Section || Section[]
    if (!('kind' in body)) {
      return (
        <Flex marginTop="1rem" flexDirection="column" rowGap="1.75rem">
          {asCompactedArray(body).map((item, idx) => {
            const subSectionKey = item.title || `${sectionKey}_${idx}`;
            return <Section sectionKey={subSectionKey} key={subSectionKey} section={item} />;
          })}
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
        <>
          {body.text && (
            <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
              <Markdown>{body.text}</Markdown>
            </div>
          )}
          <Code
            marginTop="1rem"
            maxWidth={!['jsx', 'json'].includes(body.language) ? '28rem' : undefined}
            maxHeight={body.language !== 'jsx' ? '25rem' : undefined}
            language={body.language}
            displayLanguage={body.language !== 'jsx'}
            displayLineNumbers={body.language === 'jsx'}
            sourceCode={body.code}
          />
        </>
      );
    }
    // Code[]
    if (body.kind === 'code' && Array.isArray(body.code)) {
      return (
        <>
          {body.text && (
            <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
              <Markdown>{body.text}</Markdown>
            </div>
          )}
          <TabBar
            kind="success"
            initialTab="Example"
            style={{ maxWidth: '10rem', margin: '0' }}
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
  const titleAsKebab = title && toKebabCase(title);

  return (
    <section>
      {title && headerVariant !== 'body' && (
        <Header
          className={styles.headerIdk}
          id={titleAsKebab}
          // for nav
          style={{ scrollMarginTop: 80 }}
        >
          <Link href={`#${titleAsKebab}`} scroll style={{ textDecoration: 'none' }}>
            {title}
          </Link>
        </Header>
      )}
      {title && headerVariant === 'body' && <Header bold>{title}</Header>}
      {subtitle && (
        <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          <Markdown>{subtitle}</Markdown>
        </div>
      )}
      <Body body={body} />
    </section>
  );
};

export default Card;
