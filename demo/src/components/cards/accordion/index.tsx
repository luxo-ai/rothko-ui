import { Flex } from '@rothko-ui/react';

import accordionCopy from './copy';
import Card from '../Card';
import Example from '../Example';
import Import from '../Import';
import Props from '../Props';
import { accordionPanelProps, accordionProps } from './props';
import Usage from '../Usage';
import Basic from './usage/Basic';
import Compact from './usage/Compact';
import IconOverride from './usage/IconOverride';
import Multiple from './usage/Multiple';
import Selected from './usage/Selected';
import {
  BASIC,
  VARIANT,
  COMPACT,
  ICON_OVERRIDE,
  MULTIPLE,
  SELECTED,
  WITH_SUBTITLE,
} from './usage/sourceCode';
import Variant from './usage/Variant';
import WithSubtitle from './usage/WithSubtitle';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Accordion';

const IMPORT_GLOBAL = "import { Accordion, AccordionPanel } from '@rothko-ui/react';";
const IMPORT_SINGLE = "import { Accordion, AccordionPanel } from '@rothko-ui/accordion';";

const AccordionCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={accordionCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Import global={IMPORT_GLOBAL} single={IMPORT_SINGLE} />
        <Usage />
        <Flex flexDirection="column" rowGap="2.5rem">
          <Example sourceCode={BASIC}>
            <Basic />
          </Example>
          <Example title="Variant" sourceCode={VARIANT}>
            <Variant />
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
          { props: accordionProps, title: 'Accordion Props' },
          { props: accordionPanelProps, title: 'AccordionPanel Props' },
        ]}
      />
    </Card>
  );
};

export default AccordionCard;
