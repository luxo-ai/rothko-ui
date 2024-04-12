import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/ui';
import { ArrowIosDownward, ArrowIosForward, RadioButtonOff, RadioButtonOn } from '@rothko-ui/icons';

const ARROW_ICON_SIZE = 20;
const RADIO_ICON_SIZE = 18;

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = () => {
  return (
    <Accordion
      icon={({ open }) =>
        open ? (
          <ArrowIosDownward width={ARROW_ICON_SIZE} height={ARROW_ICON_SIZE} />
        ) : (
          <ArrowIosForward width={ARROW_ICON_SIZE} height={ARROW_ICON_SIZE} />
        )
      }
      multiple
    >
      <AccordionPanel title="Label 1">{CONTENT}</AccordionPanel>
      <AccordionPanel
        icon={({ open }) =>
          open ? (
            <RadioButtonOn width={RADIO_ICON_SIZE} height={RADIO_ICON_SIZE} />
          ) : (
            <RadioButtonOff width={RADIO_ICON_SIZE} height={RADIO_ICON_SIZE} />
          )
        }
        title="Label 2"
      >
        {CONTENT}
      </AccordionPanel>
      <AccordionPanel title="Label 3">{CONTENT}</AccordionPanel>
    </Accordion>
  );
};

export default App;
