'use client';

import { insertKind } from '@helpers';
import { Flex, ToasterContextProvider, type RothkoKind } from '@rothko-ui/react';
import { useState } from 'react';

import toastCopy from './copy';
import toastProps from './props';
import Basic from './usage/Basic';
import { BASIC, WITH_KIND, WITH_LIFE } from './usage/sourceCode';
import WithKind from './usage/WithKind';
import WithLife from './usage/WithLife';

import { Card, Import, Props, Usage } from '@/components/card';
import { Container } from '@/components/container';
import Example from '@/components/Example';
import { KindRadioGroup } from '@/components/KindRadioGroup';
import { useIsMobileOrTablet } from '@/hooks/useIsMobileOrTablet';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Toaster';

const IMPORT_GLOBAL = "import { useToaster } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { useToaster } from '@rothko-ui/toaster';";

const Page = () => {
  const [kind, setKind] = useState<RothkoKind>('danger');
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWidth = isMobileOrTablet ? undefined : '15rem';

  return (
    <ToasterContextProvider>
      <Card codeUrl={GITHUB_URL} copy={toastCopy}>
        <Flex as="section" flexDirection="column" rowGap="1.5rem">
          <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
          <Usage />
          <Example sourceCode={BASIC}>
            <Container maxWidth={maxWidth}>
              <Basic />
            </Container>
          </Example>
          <Example title="With Life" sourceCode={WITH_LIFE}>
            <Container maxWidth={maxWidth}>
              <WithLife />
            </Container>
          </Example>
          <Container>
            <Example title="With Kind" sourceCode={insertKind(WITH_KIND, kind)}>
              <Container maxWidth={maxWidth}>
                <WithKind kind={kind} />
              </Container>
            </Example>
            <KindRadioGroup kind={kind} setKind={setKind} />
          </Container>
        </Flex>
        <Props copy={{ props: toastProps, title: 'Hook Args' }} />
      </Card>
    </ToasterContextProvider>
  );
};

export default Page;
