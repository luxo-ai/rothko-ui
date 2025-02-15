import { useContext } from 'react';

import RadioGroupContext from './RadioGroupContext';

const useRadioGroup = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('useRadioGroup called outside of context');
  }
  return ctx;
};

export default useRadioGroup;
