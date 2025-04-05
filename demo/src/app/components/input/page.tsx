'use client';

import inputCopy from './copy';
import styles from './Input.module.scss';
import inputProps from './props';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import { BASIC, DISABLED } from './usage/sourceCode';

import { Card, Import, Props, Usage } from '@/components/card';
import { Container } from '@/components/container';
import Example from '@/components/Example';
import { Flex } from '@/components/flex';
import { useIsMobileOrTablet } from '@/hooks/useIsMobileOrTablet';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Input';

const IMPORT_GLOBAL = "import { Input } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Input } from '@rothko-ui/input';";

const Page = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '30rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={inputCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
        <Example sourceCode={BASIC}>
          <Container className={styles['input-container']} maxWidth={maxWith}>
            <Basic />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container className={styles['input-container']} maxWidth={maxWith}>
            <Disabled />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: inputProps }} />
    </Card>
  );
};

export default Page;
