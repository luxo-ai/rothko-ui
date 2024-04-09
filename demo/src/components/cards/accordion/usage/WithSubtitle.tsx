import React from 'react';
import { Accordion, AccordionPanel, Typography } from '@rothko-ui/ui';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = () => {
  return (
    <Accordion>
      <AccordionPanel title="Label 1" subtitle="String subtitle">
        {CONTENT}
      </AccordionPanel>
      <AccordionPanel
        title="Label 2"
        subtitle={<Typography.bodySmall>ReactElement subtitle</Typography.bodySmall>}
      >
        {CONTENT}
      </AccordionPanel>
      <AccordionPanel title="Label 3" subtitle="Massa ultricies mi quis hendrerit dolor magna.">
        {CONTENT}
      </AccordionPanel>
    </Accordion>
  );
};

export default App;
