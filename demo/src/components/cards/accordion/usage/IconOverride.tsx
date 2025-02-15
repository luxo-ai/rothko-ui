import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/react';
import { ArrowIosForward, RadioButtonOff, RadioButtonOn } from '@rothko-ui/icons';

const ICON_SIZE = '1rem';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const IconWithTransition = ({ open }: { open: boolean }) => {
  return (
    <ArrowIosForward
      style={{
        transition: 'transform 0.23s ease-in-out',
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
      }}
      width={ICON_SIZE}
      height={ICON_SIZE}
    />
  );
};

const App = () => {
  return (
    <Accordion
      // override the icon at an accordion level
      icon={({ open }) => {
        return <IconWithTransition open={open} />;
      }}
    >
      <AccordionPanel title="Label 1">{CONTENT}</AccordionPanel>
      <AccordionPanel
        title="Label 2"
        // override the icon at a panel level
        icon={({ open }) => {
          return open ? (
            <RadioButtonOn width={ICON_SIZE} height={ICON_SIZE} />
          ) : (
            <RadioButtonOff width={ICON_SIZE} height={ICON_SIZE} />
          );
        }}
      >
        {CONTENT}
      </AccordionPanel>
      <AccordionPanel title="Label 3">{CONTENT}</AccordionPanel>
    </Accordion>
  );
};

export default App;
