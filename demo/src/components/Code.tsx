import { CopyOutline } from '@rothko-ui/icons';
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
} as const;

type CodeProps = React.CSSProperties & {
  sourceCode: string;
  hideBar?: boolean;
  displayLanguage?: boolean;
  displayLineNumbers?: boolean;
  language: Language;
  themeOverride?: keyof typeof THEMES;
};

export const Code = ({
  sourceCode,
  language,
  hideBar,
  displayLanguage,
  displayLineNumbers,
  themeOverride,
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
            {!hideBar && (
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
            <pre
              style={{
                ...style,
                ...containerStyle,
                margin: '0.125rem 0',
                padding: hideBar ? '1rem' : '0.5rem 1rem',
                //  overflow: 'scroll',
                overflow: 'auto',
              }}
            >
              {tokens.map((line, i) => (
                // eslint-disable-next-line react/jsx-props-no-spreading, react/no-array-index-key
                <div key={i} {...getLineProps({ line })}>
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
