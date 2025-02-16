import { Github } from '@rothko-ui/icons';
import {
  Tabs,
  Tab,
  Container,
  Flex,
  FlexItem,
  Paragraph,
  Heading1,
  Heading,
} from '@rothko-ui/react';
import toKebabCase from 'lodash.kebabcase';
import Link from 'next/link';
import React from 'react';

import { Code } from '../Code';
import styles from './Card.module.scss';
import Markdown from './Markdown';
import type { Body as BodyType, CCode, CardCopy, Section as SectionType } from './types';
import useTheme from '../../hooks/useTheme';
import { List, ListItem } from '../list';

type CardProps = {
  children?: React.ReactNode;
  copy: CardCopy;
  codeUrl?: string;
};

const Card = ({ children, copy, codeUrl }: CardProps) => {
  const { theme } = useTheme();
  const { title, description, sections } = copy;
  return (
    <div className={styles.componentCard}>
      <header>
        <Heading1>{title}</Heading1>
        <Paragraph className={styles.bodySubtext}>{description}</Paragraph>
        {codeUrl && (
          <Container marginTop="1.5rem">
            <Link
              className="cursor-pointer flex items-center gap-2 w-fit"
              href={codeUrl}
              target="_bank"
            >
              <Github width={23} height={23} fill={theme === 'dark' ? '#fff' : undefined} />
              <Paragraph size="s">View Source</Paragraph>
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
  sectionKey: string;
  section: SectionType;
};

const Section = ({ sectionKey, section }: SectionProps) => {
  const { variant: headerVariant = 'h3', title, subtitle, body } = section;

  const Body = ({ body }: { body: BodyType }) => {
    // string
    if (typeof body === 'string') {
      return (
        <div style={{ marginTop: '0.5rem' }}>
          <Markdown>{body}</Markdown>
        </div>
      );
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
    // Code[]
    if (
      Array.isArray(body) &&
      typeof body[0] !== 'string' &&
      'kind' in body[0] &&
      body[0].kind === 'code'
    ) {
      return (
        <Flex flexDirection="column" rowGap="1rem">
          {(body as CCode[]).map((item, idx) => {
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
      const bodyArray = (Array.isArray(body) ? body : [body]) as SectionType[];
      return (
        <Flex marginTop="1rem" flexDirection="column" rowGap="1.75rem">
          {bodyArray.filter(Boolean).map((item, idx) => {
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
          <Tabs kind="success" style={{ maxWidth: '10rem', margin: '0' }} initialTab="Example">
            {body.code.map(({ tag, text, icon: Icon }) => (
              <Tab
                key={text}
                style={{ margin: '1rem 0 1rem 0' }}
                leftIcon={Icon && <Icon />}
                title={tag}
                $key={text}
              >
                <Code
                  maxWidth={!['jsx', 'json'].includes(body.language) ? '28rem' : undefined}
                  maxHeight={body.language !== 'jsx' ? '25rem' : undefined}
                  language={body.language}
                  displayLanguage={body.language !== 'jsx'}
                  displayLineNumbers={body.language === 'jsx'}
                  sourceCode={text}
                />
              </Tab>
            ))}
          </Tabs>
        </>
      );
    }
    return null;
  };

  const titleAsKebab = title && toKebabCase(title);

  return (
    <section>
      {title && headerVariant !== 'body' && (
        <Heading
          variant={headerVariant}
          className={styles.headerIdk}
          id={titleAsKebab}
          // for nav
          style={{ scrollMarginTop: 80 }}
        >
          <Link href={`#${titleAsKebab}`} scroll style={{ textDecoration: 'none' }}>
            {title}
          </Link>
        </Heading>
      )}
      {title && headerVariant === 'body' && <Paragraph variant="bold">{title}</Paragraph>}
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
