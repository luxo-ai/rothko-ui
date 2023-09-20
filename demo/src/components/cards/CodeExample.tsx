import { CopyOutline } from '@rothko-ui/icons';
import {
  Container,
  Flex,
  TabBar,
  ToastContextConsumer,
  Typography,
  useRothko,
} from '@rothko-ui/ui';
import { Highlight, themes } from 'prism-react-renderer';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export enum CodeLanguage {
  TS = 'TS',
  JS = 'JS',
}

export type CodeSnippetProps = {
  initial?: CodeLanguage;
  examplesLookup: Record<CodeLanguage, string>;
  title?: string;
};

const CodeExample = ({
  title, // = 'Example',
  examplesLookup,
  initial = CodeLanguage.TS,
}: CodeSnippetProps) => {
  return (
    <>
      <Container marginTop="1rem">
        {title && <Typography.h3>{title}</Typography.h3>}
        <Container marginTop="1rem">
          <TabBar
            kind="success"
            initialTab={initial}
            style={{ maxWidth: '10rem' }}
            tabs={[
              {
                title: 'tsx',
                key: CodeLanguage.TS,
                render: () => (
                  <Example code={examplesLookup['TS']} codeLanguage={CodeLanguage.TS} />
                ),
              },
              {
                title: 'jsx',
                key: CodeLanguage.JS,
                render: () => (
                  <Example code={examplesLookup['JS']} codeLanguage={CodeLanguage.JS} />
                ),
              },
            ]}
          />
        </Container>
      </Container>
    </>
  );
};

type ExampleProps = {
  codeLanguage: CodeLanguage;
  code: string;
};

const Example = ({ code, codeLanguage }: ExampleProps) => {
  const { mode } = useRothko();

  return (
    <Container margin="1rem 0">
      <Highlight
        theme={mode === 'dark' ? themes.nightOwl : themes.nightOwlLight}
        code={code}
        language={codeLanguage === CodeLanguage.TS ? 'tsx' : 'jsx'}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              padding="0.5rem 1rem"
              backgroundColor={style.backgroundColor}
            >
              <Typography.caption style={{ color: style.color }}>
                {codeLanguage === CodeLanguage.TS ? 'TypeScript' : 'JavaScript'}
              </Typography.caption>
              <ToastContextConsumer>
                {({ addToast }) => (
                  <CopyToClipboard
                    text={code}
                    onCopy={() => addToast({ content: 'Added to clipboard!', withLife: true })}
                  >
                    <button className="phantom-button">
                      <Flex gap="0.25rem">
                        <CopyOutline fill={style.color} width="1.125rem" height="1.125rem" />
                        <Typography.caption bold style={{ color: style.color }}>
                          Copy
                        </Typography.caption>
                      </Flex>
                    </button>
                  </CopyToClipboard>
                )}
              </ToastContextConsumer>
            </Flex>
            <pre
              style={{
                ...style,
                margin: '0.125rem 0',
                padding: '0.5rem 1rem',
                overflow: 'scroll',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span>{i + 1}</span>&nbsp;
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          </>
        )}
      </Highlight>
    </Container>
  );
};

export default CodeExample;
