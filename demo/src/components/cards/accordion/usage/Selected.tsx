import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/ui';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = () => {
  return (
    <Accordion selectedPanelKeys={['panel1', 'panel3']}>
      <AccordionPanel panelKey="panel1" title="Label 1">
        {CONTENT}
      </AccordionPanel>
      <AccordionPanel panelKey="panel2" title="Label 2">
        {CONTENT}
      </AccordionPanel>
      <AccordionPanel panelKey="panel3" title="Label 3">
        {CONTENT}
      </AccordionPanel>
    </Accordion>
  );
};

export default App;
