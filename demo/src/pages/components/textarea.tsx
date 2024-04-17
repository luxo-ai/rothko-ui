import React from 'react';
import TextareaCard from '../../components/cards/textarea';
import WithNavigation from '../../components/WithNavigation';

const Textarea = () => {
  return (
    <WithNavigation selected="components/textarea">
      <TextareaCard />
    </WithNavigation>
  );
};

export default Textarea;
