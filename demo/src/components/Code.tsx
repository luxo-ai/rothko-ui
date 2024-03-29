/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyOutline } from '@rothko-ui/icons';
import { Flex, ToastContextConsumer, Typography, useRothko } from '@rothko-ui/ui';
import { Highlight, themes } from 'prism-react-renderer';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

type CodeProps = React.CSSProperties & {
  language: string;
  code: string;
};

const Code = ({ code, language, ...containerStyle }: CodeProps) => {
  const { mode } = useRothko();
  return (
    <div>
      <Highlight
        theme={mode === 'dark' ? themes.jettwaveDark : themes.jettwaveLight}
        code={code}
        language={language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              padding="0.5rem 1rem"
              backgroundColor={style.backgroundColor}
            >
              <Typography.caption style={{ color: style.color }}>{language}</Typography.caption>
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
                ...containerStyle,
                ...style,
                margin: '0.125rem 0',
                padding: '0.5rem 1rem',
                overflow: 'scroll',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          </>
        )}
      </Highlight>
    </div>
  );
};

export const BashCode = React.memo(({ code }: Pick<CodeProps, 'code'>) => (
  <Code maxHeight="25rem" code={code} language="bash" />
));
BashCode.displayName = 'BashCode';

export const JsonCode = React.memo(({ code }: Pick<CodeProps, 'code'>) => (
  <Code maxHeight="25rem" language="json" code={code} />
));
JsonCode.displayName = 'JsonCode';

export default Code;
