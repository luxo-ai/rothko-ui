import { Container, Flex } from '@rothko-ui/react';

import accordionCopy from './copy';
import Card from '../Card';
import Example from '../Example';
import Basic from './usage/Basic';
import Bordered from './usage/Bordered';
import Compact from './usage/Compact';
import IconOverride from './usage/IconOverride';
import Multiple from './usage/Multiple';
import Selected from './usage/Selected';
import {
  BASIC,
  BORDERED,
  COMPACT,
  ICON_OVERRIDE,
  MULTIPLE,
  SELECTED,
  WITH_SUBTITLE,
} from './usage/sourceCode';
import WithSubtitle from './usage/WithSubtitle';
import { TSCode } from '../../Code';
import Props from '../Props';
import propsCopy from './props';
import Usage from '../Usage';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/react/src/Accordion';

const IMPORT = "import { Accordion, AccordionPanel } from '@rothko-ui/react';";

const AccordionCard = () => {
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
