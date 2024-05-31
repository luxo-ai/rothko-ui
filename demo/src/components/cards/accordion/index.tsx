import { useState } from 'react';

import type { RothkoKind } from '@rothko-ui/ui';
import { Container, Flex, FlexItem } from '@rothko-ui/ui';

import accordionCopy from './copy';
import Basic from './usage/Basic';
import Bordered from './usage/Bordered';
import Card from '../Card';
import Compact from './usage/Compact';
import Example from '../Example';
import IconOverride from './usage/IconOverride';
import Multiple from './usage/Multiple';
import Selected from './usage/Selected';
import WithKind from './usage/WithKind';
import WithSubtitle from './usage/WithSubtitle';
import {
  BASIC,
  BORDERED,
  COMPACT,
  ICON_OVERRIDE,
  MULTIPLE,
  SELECTED,
  WITH_KIND,
  WITH_SUBTITLE,
} from './usage/sourceCode';
import { TSCode } from '../../Code';
import Props from '../Props';
import propsCopy from './props';
import { insertKind } from '../helpers';
import Usage from '../Usage';
import KindRadioGroup from '../KindRadioGroup';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Accordion';

const IMPORT = "import { Accordion, AccordionPanel } from '@rothko-ui/ui';";

const AccordionCard = () => {
  const [kind, setKind] = useState<RothkoKind>('secondary');

  return (
    <Card codeUrl={GITHUB_URL} copy={accordionCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
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
          <FlexItem>
            <Example title="With Kind" sourceCode={insertKind(WITH_KIND, kind)}>
              <WithKind kind={kind} />
            </Example>
            <KindRadioGroup kind={kind} setKind={setKind} />
          </FlexItem>
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
