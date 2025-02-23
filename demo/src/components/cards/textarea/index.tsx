import { Container, Flex } from '@rothko-ui/react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Card from '../Card';
import Example from '../Example';
import textareaCopy from './copy';
import Import from '../Import';
import Props from '../Props';
import Usage from '../Usage';
import textareaProps from './props';
import style from './Textarea.module.scss';
import Basic from './usage/Basic';
import Disabled from './usage/Disabled';
import { BASIC, DISABLED } from './usage/sourceCode';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Input';

const IMPORT_GLOBAL = "import { Textarea } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Textarea } from '@rothko-ui/input';";

const TextareaCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '30rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={textareaCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
        <Example sourceCode={BASIC}>
          <Container className={style['textarea-container']} maxWidth={maxWith}>
            <Basic />
          </Container>
        </Example>
        <Example title="Disabled" sourceCode={DISABLED}>
          <Container className={style['textarea-container']} maxWidth={maxWith}>
            <Disabled />
          </Container>
        </Example>
        <Props copy={{ props: textareaProps }} />
      </Flex>
    </Card>
  );
};

export default TextareaCard;
