import { CopyOutline } from '@rothko-ui/icons';
import {
  Container,
  Flex,
  ToastContextConsumer,
  ToastContextProvider,
  Typography,
  useRothko,
} from '@rothko-ui/ui';
import { Highlight, themes } from 'prism-react-renderer';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import WithNavigation from '../components/WithNavigation';
import { useRouter } from 'next/router';

type CodeProps = {
  code: string;
};

const Code = ({ code }: CodeProps) => {
  const { mode } = useRothko();
  return (
    <Highlight
      theme={mode === 'dark' ? themes.jettwaveDark : themes.jettwaveLight}
      code={code}
      language="bash"
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            padding="0.5rem 1rem"
            backgroundColor={style.backgroundColor}
          >
            <Typography.caption style={{ color: style.color }}>bash</Typography.caption>
            <ToastContextConsumer>
              {({ addToast }) => (
                <CopyToClipboard
                  text={code}
                  onCopy={() => addToast({ content: 'Snippet added to clipboard' })}
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

const Overview = () => {
  const router = useRouter();
  return (
    <WithNavigation selected="/overview">
      <Typography.h1>Overview</Typography.h1>
      <Typography.body style={{ marginTop: '1rem' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel neque nec quam
        convallis rhoncus. Ut sed ipsum urna. Morbi in ligula id massa rutrum tincidunt. Phasellus
        ex mauris, condimentum eu lobortis dictum, fermentum at felis. Cras mollis ex non erat
        varius, in pretium ipsum condimentum. Donec mauris erat, gravida non sem mattis, fermentum
        aliquam lorem. Cras viverra nunc odio, in suscipit sapien condimentum nec.
      </Typography.body>
      <Typography.h3 style={{ marginTop: '3rem' }}>Setup</Typography.h3>
      <Container marginTop="2rem">
        <Typography.h5>Installing Rothko UI</Typography.h5>
        <Typography.body style={{ marginTop: '1rem' }}>
          Rothko UI is available on npm as @rothko-ui/ui. This single package contains all Rothko UI
          components. The iconography library is separately available as @rothko-ui/icons.
        </Typography.body>
      </Container>
      <Container marginTop="2rem">
        <ToastContextProvider>
          <Flex flexDirection="column" rowGap="1rem">
            <Container maxWidth="28rem">
              <Code code="yarn add @rothko-ui/ui @rothko-ui/icons" />
            </Container>
            <Typography.body>or</Typography.body>
            <Container maxWidth="28rem">
              <Code code="npm install @rothko-ui/ui @rothko-ui/icons" />
            </Container>
          </Flex>
        </ToastContextProvider>
      </Container>
      <Typography.h3 style={{ marginTop: '3rem' }}>SSR</Typography.h3>
      <Typography.body style={{ marginTop: '1rem' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel neque nec quam
        convallis rhoncus. Ut sed ipsum urna. Morbi in ligula id massa rutrum tincidunt. Phasellus
        ex mauris, condimentum eu lobortis dictum, fermentum at felis. Cras mollis ex non erat
        varius, in pretium ipsum condimentum. Donec mauris erat, gravida non sem mattis, fermentum
        aliquam lorem. Cras viverra nunc odio, in suscipit sapien condimentum nec.
      </Typography.body>

      <Typography.h3 style={{ marginTop: '3rem' }}>Next Steps</Typography.h3>
      <Typography.body style={{ marginTop: '1rem' }}>
        Check out the{' '}
        <Typography.linkButton onClick={() => router.push('/theming')} as="span">
          themeing
        </Typography.linkButton>{' '}
        section, to better understand how to customize Rothko UI to your needs.
      </Typography.body>
    </WithNavigation>
  );
};

export default Overview;
