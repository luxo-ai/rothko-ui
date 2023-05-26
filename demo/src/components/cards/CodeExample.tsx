import { CodeOutline, CopyOutline } from '@rothko-ui/icons';
import {
  Container,
  Flex,
  OptionGroup,
  ToastContextConsumer,
  Typography,
  useRothko,
} from '@rothko-ui/ui';
import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export enum CodeLanguage {
  TS = 'TS',
  JS = 'JS',
}

export type CodeSnippetProps = {
  initial?: CodeLanguage;
  alwaysExpanded?: boolean;
  examplesLookup: Record<CodeLanguage, string>;
};

const CodeExample = ({
  examplesLookup,
  alwaysExpanded = true,
  initial = CodeLanguage.TS,
}: CodeSnippetProps) => {
  const [expanded, setExpanded] = useState<CodeLanguage | null>(initial || null);
  const { mode } = useRothko();
  return (
    <>
      <Container marginTop="1rem">
        <Typography.h3>Example</Typography.h3>
        <Container marginTop="1rem" maxWidth="10rem">
          <OptionGroup
            maxCol={2}
            kind="warning"
            optionGap="0.5rem"
            size="s"
            value={expanded}
            options={[
              { id: CodeLanguage.TS, label: 'TS' },
              { id: CodeLanguage.JS, label: 'JS' },
            ]}
            onChange={v => {
              if (v === expanded) {
                if (alwaysExpanded) return;
                setExpanded(null);
              } else {
                setExpanded(v);
              }
            }}
            accessoryLeft={({ size, color }) => (
              <CodeOutline height={size} width={size} fill={color} />
            )}
            // optionsWithRadius
            // withoutBorder
            //darkTheme={themes.jettwaveDark}
            //lightTheme={themes.jettwaveLight}
          />
        </Container>
      </Container>
      <Container display={expanded === null ? 'none' : undefined} margin="1rem 0">
        <Highlight
          theme={mode === 'dark' ? themes.nightOwl : themes.nightOwlLight}
          code={expanded !== null ? examplesLookup[expanded] : ''}
          language={expanded === CodeLanguage.TS ? 'tsx' : 'jsx'}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                padding="0.5rem 1rem"
                backgroundColor={style.backgroundColor}
              >
                <Typography.caption style={{ color: style.color, marginLeft: '0.5rem' }}>
                  {expanded === CodeLanguage.TS ? 'TypeScript' : 'JavaScript'}
                </Typography.caption>
                <ToastContextConsumer>
                  {({ addToast }) => (
                    <CopyToClipboard
                      text={expanded !== null ? examplesLookup[expanded] : ''}
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
                  padding: '0.5rem 0',
                  overflow: 'scroll',
                }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    <span>{i + 1}</span>
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
    </>
  );
};

export default CodeExample;
