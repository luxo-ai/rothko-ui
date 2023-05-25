import React from 'react';
import AccordionCard from '../../components/Cards/accordion';
import WithNavigation from '../../components/WithNavigation';

const Accordion = () => {
  return (
    <WithNavigation selected="components/accordion">
      <AccordionCard />
    </WithNavigation>
  );
};

export default Accordion;
