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
    <Accordion selectedKeys={['panel1', 'panel3']}>
      <AccordionPanel $key="panel1" title="Label 1">
        {CONTENT}
      </AccordionPanel>
      <AccordionPanel $key="panel2" title="Label 2">
        {CONTENT}
      </AccordionPanel>
      <AccordionPanel $key="panel3" title="Label 3">
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
