import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { Typography } from '@rothko-ui/ui';

import { startsWithHttpOrHttps } from './helpers';

const Markdown = (props: { children: string }) => (
  <ReactMarkdown
    components={{
      h1: ({ children }) => <Typography.h1>{children}</Typography.h1>,
      h2: ({ children }) => <Typography.h2>{children}</Typography.h2>,
      h3: ({ children }) => <Typography.h3>{children}</Typography.h3>,
      h4: ({ children }) => <Typography.h4>{children}</Typography.h4>,
      h5: ({ children }) => <Typography.h5>{children}</Typography.h5>,
      h6: ({ children }) => <Typography.h6>{children}</Typography.h6>,
      p: ({ children }) => <Typography.body>{children}</Typography.body>,
      a: ({ children, href = '/' }) => (
        <Link target={startsWithHttpOrHttps(href) ? '_blank' : undefined} href={href}>
          <Typography.linkButton as="span">{children}</Typography.linkButton>
        </Link>
      ),
      code: ({ children }) => <Typography.code>{children}</Typography.code>,
    }}
  >
    {props.children}
  </ReactMarkdown>
);

export default Markdown;
