import { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/react';
import { Container, Flex } from '@rothko-ui/react';

import accordionCopy from './copy';
import Basic from './usage/Basic';
import Bordered from './usage/Bordered';
import Card from '../Card';
import Compact from './usage/Compact';
import Example from '../Example';
import IconOverride from './usage/IconOverride';
import Multiple from './usage/Multiple';
import Selected from './usage/Selected';
import WithSubtitle from './usage/WithSubtitle';
import {
  BASIC,
  BORDERED,
  COMPACT,
  ICON_OVERRIDE,
  MULTIPLE,
  SELECTED,
  WITH_SUBTITLE,
} from './usage/sourceCode';
import { TSCode } from '../../Code';
import Props from '../Props';
import propsCopy from './props';
import Usage from '../Usage';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Accordion';

const IMPORT = "import { Accordion, AccordionPanel } from '@rothko-ui/react';";

const AccordionCard = () => {
  const [kind, setKind] = useState<RothkoKind>('secondary');

  return (
    <Card codeUrl={GITHUB_URL} copy={accordionCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="34rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Flex flexDirection="column" rowGap="2.5rem">
          <Example sourceCode={BASIC}>
            <Basic />
          </Example>
          <Example title="Bordered" sourceCode={BORDERED}>
            <Bordered />
          </Example>
          <Example title="Selected" sourceCode={SELECTED}>
            <Selected />
          </Example>
          <Example title="Multiple" sourceCode={MULTIPLE}>
            <Multiple />
          </Example>
          <Example title="Subtitles" sourceCode={WITH_SUBTITLE}>
            <WithSubtitle />
          </Example>
          <Example title="Compact" sourceCode={COMPACT}>
            <Compact />
          </Example>
          <Example title="Icon Override" sourceCode={ICON_OVERRIDE}>
            <IconOverride />
          </Example>
        </Flex>
      </Flex>
      <Props
        copy={[
          { props: propsCopy.accordion, title: 'Accordion Props' },
          { props: propsCopy.accordionPanel, title: 'AccordionPanel Props' },
        ]}
      />
    </Card>
  );
};

export default AccordionCard;
