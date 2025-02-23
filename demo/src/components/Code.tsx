import { CopyOutline, Gift } from '@rothko-ui/icons';
import { Flex, ToasterConsumer, Paragraph } from '@rothko-ui/react';
import { Highlight, themes } from 'prism-react-renderer';
import React, { useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { PhantomButton } from './button';
import useTheme from '../hooks/useTheme';

export type Language = 'bash' | 'jsx' | 'json' | 'text' | 'typescript' | 'css';

const THEMES = {
  jetwave: {
    dark: themes.jettwaveDark,
    light: themes.jettwaveLight,
  },
  nightOwl: {
    dark: themes.nightOwl,
    light: themes.nightOwlLight,
  },
  dracula: {
    dark: themes.dracula,
    light: themes.dracula,
  },
  duotone: {
    dark: themes.duotoneDark,
    light: themes.duotoneLight,
  },
  vs: {
    dark: themes.vsDark,
    light: themes.vsLight,
  },
  github: {
    dark: themes.github,
    light: themes.github,
  },
  oceanicNext: {
    dark: themes.oceanicNext,
    light: themes.oceanicNext,
  },
  okaidia: {
    dark: themes.okaidia,
    light: themes.okaidia,
  },
  palenight: {
    dark: themes.palenight,
    light: themes.palenight,
  },
  shadesOfPurple: {
    dark: themes.shadesOfPurple,
    light: themes.shadesOfPurple,
  },
  synthwave84: {
    dark: themes.synthwave84,
    light: themes.synthwave84,
  },
  ultramin: {
    dark: themes.ultramin,
    light: themes.ultramin,
  },
} as const;

type CodeProps = React.CSSProperties & {
  sourceCode: string;
  hideBar?: boolean;
  displayLanguage?: boolean;
  displayLineNumbers?: boolean;
  language: Language;
  themeOverride?: keyof typeof THEMES;
  testing?: boolean;
};

export const Code = ({
  sourceCode,
  language,
  hideBar,
  displayLanguage,
  displayLineNumbers,
  themeOverride,
  testing,
  ...containerStyle
}: CodeProps) => {
  const { theme: mode } = useTheme();
  const defaultTheme = language === 'jsx' ? 'nightOwl' : 'jetwave';
  const theme = THEMES[themeOverride || defaultTheme];

  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection) return;

      const range = selection.getRangeAt(0);
      const clonedSelection = range.cloneContents();

      // Remove non-selectable spans
      clonedSelection.querySelectorAll('.non-selectable').forEach(el => el.remove());

      // Convert selection to plain text & HTML
      const tempDiv = document.createElement('pre');
      tempDiv.appendChild(clonedSelection);
      const modifiedText = tempDiv.innerText || tempDiv.textContent || ' '; // Plain text
      const modifiedHtml = tempDiv.innerHTML; // Formatted HTML

      // Override clipboard content
      e.clipboardData?.setData('text/plain', modifiedText);
      e.clipboardData?.setData('text/html', modifiedHtml);
      e.preventDefault();
    };

    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return (
    <div style={{ maxWidth: containerStyle.maxWidth, width: containerStyle.width }}>
      <Highlight
        theme={mode === 'dark' ? theme.dark : theme.light}
        code={sourceCode}
        language={language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <>
            {!hideBar && !testing && (
              <Flex
                alignItems="center"
                justifyContent="space-between"
                padding="0.5rem 1rem"
                backgroundColor={style.backgroundColor}
              >
                {displayLanguage ? (
                  <Paragraph size="xs" style={{ color: style.color }}>
                    {language}
                  </Paragraph>
                ) : (
                  <div />
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
                          <Paragraph size="xs" variant="bold" style={{ color: style.color }}>
                            Copy
                          </Paragraph>
                        </Flex>
                      </PhantomButton>
                    </CopyToClipboard>
                  )}
                </ToasterConsumer>
              </Flex>
            )}
            <div
              className="code"
              style={{
                ...style,
                ...containerStyle,
                margin: testing ? '0.125rem 0' : '0.125rem 0',
                padding: testing || hideBar ? '0.75rem' : '0.5rem 1rem',
                lineHeight: testing ? '1' : undefined,
                //  overflow: 'scroll',
                // overflow: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <pre style={{ flexDirection: 'column', display: 'inline-flex', overflowX: 'auto' }}>
                {tokens.map((line, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...getLineProps({ line })}
                  >
                    {displayLineNumbers && (
                      <span className="non-selectable">
                        {i + 1}&nbsp;{i < 9 ? ' ' : ''}
                      </span>
                    )}
                    {line.map((token, key) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading, react/no-array-index-key
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
              {testing && (
                <ToasterConsumer>
                  {({ addToast }) => (
                    <CopyToClipboard
                      text={sourceCode}
                      onCopy={() => addToast({ content: 'Added to clipboard!', withLife: true })}
                    >
                      <PhantomButton>
                        <CopyOutline
                          fill={style.color}
                          opacity={0.65}
                          width="1.125rem"
                          height="1.125rem"
                        />
                      </PhantomButton>
                    </CopyToClipboard>
                  )}
                </ToasterConsumer>
              )}
            </div>
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

export const TSCode = ({
  sourceCode,
  maxWidth,
  testing,
  themeOverride,
}: Pick<CodeProps, 'sourceCode' | 'maxWidth' | 'testing' | 'themeOverride'>) => (
  <Code
    displayLanguage
    maxHeight="25rem"
    language="typescript"
    sourceCode={sourceCode}
    maxWidth={maxWidth}
    testing={testing}
    themeOverride={themeOverride}
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
