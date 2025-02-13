import { Highlight, themes } from 'prism-react-renderer';
import CopyToClipboard from 'react-copy-to-clipboard';
import React from 'react';

import { CopyOutline } from '@rothko-ui/icons';
import { Flex, ToasterConsumer, Paragraph } from '@rothko-ui/components';
import useTheme from '../hooks/useTheme';
import { PhantomButton } from './button';

export type Language = 'bash' | 'jsx' | 'json' | 'text' | 'typescript';

const THEMES = {
  jetwave: {
    dark: themes.jettwaveDark,
    light: themes.jettwaveLight,
  },
  nightOwl: {
    dark: themes.nightOwl,
    light: themes.nightOwlLight,
  },
} as const;

type CodeProps = React.CSSProperties & {
  sourceCode: string;
  displayLanguage?: boolean;
  displayLineNumbers?: boolean;
  language: Language;
  themeOverride?: keyof typeof THEMES;
};

export const Code = ({
  sourceCode,
  language,
  displayLanguage,
  displayLineNumbers,
  themeOverride,
  ...containerStyle
}: CodeProps) => {
  const { theme: mode } = useTheme();
  const defaultTheme = language === 'jsx' ? 'nightOwl' : 'jetwave';
  const theme = THEMES[themeOverride || defaultTheme];
  return (
    <div style={{ maxWidth: containerStyle.maxWidth, width: containerStyle.width }}>
      <Highlight
        theme={mode === 'dark' ? theme.dark : theme.light}
        code={sourceCode}
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
              {displayLanguage && (
                <Paragraph size="xs" style={{ color: style.color }}>
                  {language}
                </Paragraph>
              )}
              <ToasterConsumer>
                {({ addToast }) => (
                  <CopyToClipboard
                    text={sourceCode}
                    onCopy={() => addToast({ content: 'Added to clipboard!', withLife: true })}
                  >
                    <PhantomButton>
                      <Flex gap="0.25rem">
                        <CopyOutline fill={style.color} width="1.125rem" height="1.125rem" />
                        <Paragraph size="xs" bold style={{ color: style.color }}>
                          Copy
                        </Paragraph>
                      </Flex>
                    </PhantomButton>
                  </CopyToClipboard>
                )}
              </ToasterConsumer>
            </Flex>
            <pre
              style={{
                ...style,
                ...containerStyle,
                margin: '0.125rem 0',
                padding: '0.5rem 1rem',
                //  overflow: 'scroll',
                overflow: 'auto',
              }}
            >
              {tokens.map((line, i) => (
                // eslint-disable-next-line react/jsx-props-no-spreading, react/no-array-index-key
                <div key={i} {...getLineProps({ line })}>
                  {displayLineNumbers && <span>{i + 1}&nbsp;</span>}
                  {line.map((token, key) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading, react/no-array-index-key
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

export const TextCode = ({ sourceCode, maxWidth }: Pick<CodeProps, 'sourceCode' | 'maxWidth'>) => (
  <Code maxHeight="25rem" language="text" sourceCode={sourceCode} maxWidth={maxWidth} />
);

export const BashCode = ({ sourceCode, maxWidth }: Pick<CodeProps, 'sourceCode' | 'maxWidth'>) => (
  <Code
    displayLanguage
    maxHeight="25rem"
    sourceCode={sourceCode}
    language="bash"
    maxWidth={maxWidth}
  />
);

export const JsonCode = ({ sourceCode, maxWidth }: Pick<CodeProps, 'sourceCode' | 'maxWidth'>) => (
  <Code
    displayLanguage
    maxHeight="25rem"
    language="json"
    sourceCode={sourceCode}
    maxWidth={maxWidth}
  />
);

export const TSCode = ({ sourceCode, maxWidth }: Pick<CodeProps, 'sourceCode' | 'maxWidth'>) => (
  <Code
    displayLanguage
    maxHeight="25rem"
    language="typescript"
    sourceCode={sourceCode}
    maxWidth={maxWidth}
  />
);

export const JSXCode = ({
  sourceCode,
  maxWidth,
  width,
}: Pick<CodeProps, 'sourceCode' | 'maxWidth' | 'width'>) => (
  <Code
    displayLineNumbers
    language="jsx"
    sourceCode={sourceCode}
    width={width}
    maxWidth={maxWidth}
  />
);
