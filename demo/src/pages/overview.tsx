import { Container, Flex, Typography } from '@rothko-ui/ui';
import { useRouter } from 'next/router';
import { themes } from 'prism-react-renderer';
import React from 'react';
import Code from '../components/Code';
import WithNavigation from '../components/WithNavigation';

const BashCode = React.memo(({ code }: { code: string }) => (
  <Code
    code={code}
    darkTheme={themes.jettwaveDark}
    lightTheme={themes.jettwaveLight}
    language="bash"
  />
));

BashCode.displayName = 'BashCode';

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
          Rothko UI is available on npm as <code>@rothko-ui/ui</code>. This single package contains
          all Rothko UI components. The iconography library is separately available as{' '}
          <code>@rothko-ui/icons</code>.
        </Typography.body>
      </Container>
      <Container marginTop="2rem">
        <Flex flexDirection="column" rowGap="1rem">
          <Container maxWidth="28rem">
            <BashCode code="yarn add @rothko-ui/ui @rothko-ui/icons" />
          </Container>
          <Typography.body>or</Typography.body>
          <Container maxWidth="28rem">
            <BashCode code="npm install @rothko-ui/ui @rothko-ui/icons" />
          </Container>
        </Flex>
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
