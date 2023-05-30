import { Accordion, AccordionPanel, Container } from '@rothko-ui/ui';
import { useReducer } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import AccordionCustomizations, { customizationsReducer } from './Customizations';
import accordionCopy from './copy';
import accordionProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React from 'react';
import { Accordion, AccordionPanel } from '@rothko-ui/ui';

const Example: React.FC = () => {
  return (
    <Accordion>
      <AccordionPanel title="Label 1">
        Label 1 content
      </AccordionPanel>
      <AccordionPanel title="Label 2">
        Label 2 content
      </AccordionPanel>
      <AccordionPanel title="Label 3">
        Label 3 content
      </AccordionPanel>
    </Accordion> 
  );
}
`,
  [CodeLanguage.JS]: `
import { Accordion, AccordionPanel } from '@rothko-ui/ui';

const Example = () => {
  return (
    <Accordion>
      <AccordionPanel title="Label 1">
        Label 1 content
      </AccordionPanel>
      <AccordionPanel title="Label 2">
        Label 2 content
      </AccordionPanel>
      <AccordionPanel title="Label 3">
        Label 3 content
      </AccordionPanel>
    </Accordion> 
  );
}
`,
};

const AccordionCard = () => {
  const [state, dispatch] = useReducer(customizationsReducer, {
    bordered: true,
    withKind: false,
    kind: 'primary',
    mutuallyExclusive: false,
  });

  return (
    <Card
      copy={accordionCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: accordionProps }}
    >
      <section>
        <Accordion
          kind={state.withKind ? state.kind : undefined}
          mutuallyExclusive={state.mutuallyExclusive}
          bordered={state.bordered}
        >
          <AccordionPanel title="Label 1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit
            at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.
          </AccordionPanel>
          <AccordionPanel title="Label 2">
            Massa ultricies mi quis hendrerit dolor magna. Consequat id porta nibh venenatis cras
            sed felis eget. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent.
            Malesuada proin libero nunc consequat interdum varius.
          </AccordionPanel>
          <AccordionPanel title="Label 3">
            Montes nascetur ridiculus mus mauris vitae ultricies leo. Sed vulputate odio ut enim
            blandit volutpat maecenas volutpat. Amet venenatis urna cursus eget nunc.
          </AccordionPanel>
        </Accordion>
      </section>
      <Container as="section" maxWidth="55rem">
        <AccordionCustomizations state={state} dispatch={dispatch} />
      </Container>
    </Card>
  );
};

export default AccordionCard;
