export const BASIC = `
import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/ui';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = () => {
  return (
    <Accordion>
      <AccordionPanel title="Label 1">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 2">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 3">{CONTENT}</AccordionPanel>
    </Accordion>
  );
};

export default App;
`;
export const BORDERED = `
import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/ui';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = () => {
  return (
    <Accordion bordered>
      <AccordionPanel title="Label 1">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 2">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 3">{CONTENT}</AccordionPanel>
    </Accordion>
  );
};

export default App;
`;
export const COMPACT = `
import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/ui';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = () => {
  return (
    <Accordion compact>
      <AccordionPanel title="Label 1">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 2">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 3">{CONTENT}</AccordionPanel>
    </Accordion>
  );
};

export default App;
`;
export const ICON_OVERRIDE = `
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
      iconOverride={({ open }) =>
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
        iconOverride={({ open }) =>
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
`;
export const MULTIPLE = `
import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/ui';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = () => {
  return (
    <Accordion multiple>
      <AccordionPanel title="Label 1">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 2">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 3">{CONTENT}</AccordionPanel>
    </Accordion>
  );
};

export default App;
`;
export const SELECTED = `
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
`;
export const WITH_KIND = `
import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/ui';

const CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.';

const App = () => {
  return (
    <Accordion kind="info">
      <AccordionPanel title="Label 1">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 2">{CONTENT}</AccordionPanel>
      <AccordionPanel title="Label 3">{CONTENT}</AccordionPanel>
    </Accordion>
  );
};

export default App;
`;
export const WITH_SUBTITLE = `
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
`;
