import { Accordion, AccordionPanel, Typography } from '@rothko-ui/ui';
import React from 'react';
import cardStyles from '../Cards.module.scss';

const AccordionCard = () => {
  return (
    <div className={cardStyles.componentCard}>
      <Typography.h4 style={{ marginBottom: '1rem' }}>Accordion</Typography.h4>
      <div className="accordion-container">
        <Accordion mutuallyExclusive bordered>
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
      </div>
    </div>
  );
};

export default AccordionCard;
