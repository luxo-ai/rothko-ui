import { Container, Flex, Typography } from '@rothko-ui/ui';
import Link from 'next/link';
import { BashCode } from '../../Code';
import Card from '../Card';
import CodeExample, { CodeLanguage } from '../CodeExample';
import overviewCopy from './copy';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
  [CodeLanguage.JS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
};

export const OverviewCard = () => {
  return (
    <Card copy={overviewCopy}>
      <section>
        <Typography.h3>Setup</Typography.h3>
        <Container marginTop="1.25rem">
          <Typography.h6>Installing Rothko UI</Typography.h6>
          <Typography.body>
            Rothko UI is available on npm as <code>@rothko-ui/ui</code>. This single package
            contains all Rothko UI components. The iconography library is separately available as{' '}
            <code>@rothko-ui/icons</code>.
          </Typography.body>
        </Container>
      </section>
      <section>
        <Flex flexDirection="column" rowGap="1rem">
          <Container maxWidth="28rem">
            <BashCode code="yarn add @rothko-ui/ui @rothko-ui/icons" />
          </Container>
          <Typography.body>or</Typography.body>
          <Container maxWidth="28rem">
            <BashCode code="npm install @rothko-ui/ui @rothko-ui/icons" />
          </Container>
        </Flex>
      </section>
      <section>
        <Typography.h3>Rothko Provider</Typography.h3>
        <Typography.body style={{ marginTop: '1.25rem' }}>
          To utilize the full capabilities of Rothko-UI components, it is important to wrap your
          main app with the Rothko-UI Context Provider. This context provider ensures that the
          necessary configuration and state are accessible throughout your application.
        </Typography.body>
        <CodeExample title="" examplesLookup={EXAMPLE_LOOKUP} />
      </section>
      <section>
        <Typography.h3>SSR</Typography.h3>
        <Typography.body style={{ marginTop: '1.25rem' }}>
          Rothko UI uses{' '}
          <Link target="_blank" href="https://styled-components.com/">
            <Typography.linkButton as="span">styled-components</Typography.linkButton>
          </Link>{' '}
          to style its components. If you are using Rothko UI in a server-side rendered app, you
          will need to ensure that the style sheets are generated correctly. For{' '}
          <Link target="_blank" href="https://nextjs.org/">
            <Typography.linkButton as="span">Next.js</Typography.linkButton> apps you&apos;ll need
            to use <code>ServerStyleSheet</code>.
          </Link>{' '}
        </Typography.body>
      </section>
      <section>
        <Typography.h3>Next Steps</Typography.h3>
        <Typography.body style={{ marginTop: '1.25rem' }}>
          Check out the{' '}
          <Link href="/theming">
            <Typography.linkButton as="span">theming</Typography.linkButton>
          </Link>{' '}
          section, to better understand how to customize Rothko UI to your needs.
        </Typography.body>
      </section>
    </Card>
  );
};
