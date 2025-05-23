import { startsWithHttpOrHttps } from '@helpers';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
  Code,
  LinkButton,
} from '@rothko-ui/react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const Markdown = (props: { children: string }) => (
  <ReactMarkdown
    components={{
      h1: ({ children }) => <Heading1>{children}</Heading1>,
      h2: ({ children }) => <Heading2>{children}</Heading2>,
      h3: ({ children }) => <Heading3>{children}</Heading3>,
      h4: ({ children }) => <Heading4>{children}</Heading4>,
      h5: ({ children }) => <Heading5>{children}</Heading5>,
      h6: ({ children }) => <Heading6>{children}</Heading6>,
      p: ({ children }) => <Paragraph>{children}</Paragraph>,
      a: ({ children, href = '/' }) => (
        <Link target={startsWithHttpOrHttps(href) ? '_blank' : undefined} href={href}>
          <LinkButton underlineVariant="none" as="span">
            {children}
          </LinkButton>
        </Link>
      ),
      code: ({ children }) => <Code style={{ fontSize: '0.875rem' }}>{children}</Code>,
    }}
  >
    {props.children}
  </ReactMarkdown>
);

export default Markdown;
