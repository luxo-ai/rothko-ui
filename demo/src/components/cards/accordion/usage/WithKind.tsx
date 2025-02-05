import React from 'react';
import type { RothkoKind } from '@rothko-ui/components';
import { Accordion, AccordionPanel } from '@rothko-ui/components';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = (props: { kind: RothkoKind }) => {
  return (
    <Accordion kind={props.kind}>
      <AccordionPanel title="Label 1">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 2">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 3">{CONTENT}</AccordionPanel>
    </Accordion>
  );
};

export default App;
