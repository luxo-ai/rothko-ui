/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyOutline } from '@rothko-ui/icons';
import { Flex, ToastContextConsumer, Typography, useRothko } from '@rothko-ui/ui';
import { Highlight } from 'prism-react-renderer';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

type CodeProps = {
  language: string;
  darkTheme: any;
  lightTheme: any;
  code: string;
};

const Code = ({ code, darkTheme, lightTheme, language }: CodeProps) => {
  const { mode } = useRothko();
  return (
    <Highlight theme={mode === 'dark' ? darkTheme : lightTheme} code={code} language={language}>
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
                  onCopy={() => addToast({ content: 'Added to clipboard!' })}
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
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </>
      )}
    </Highlight>
  );
};

export default Code;
