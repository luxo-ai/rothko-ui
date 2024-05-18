import React from 'react';

import { ChevronDownOutline, CloseOutline } from '@rothko-ui/icons';
import { scopedClasses as sc } from '@rothko-ui/utils';

import style from './ControlButton.module.scss';

const scoppedClasses = sc(style);

const CLOSE_LABEL = 'Close';
const OPEN_LABEL = 'Open';

type ControlButtonProps = {
  rotateOnOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  onClick: () => void;
  type?: 'clear' | 'indicator';
};

const Indicator = React.memo(() => {
  return <ChevronDownOutline aria-hidden width="1rem" height="1rem" />;
});

Indicator.displayName = 'Indicator';

const Clear = React.memo(() => {
  return <CloseOutline aria-hidden width="1rem" height="1rem" />;
});

Clear.displayName = 'Clear';

const ControlButton = ({ rotateOnOpen, open, disabled, onClick, type }: ControlButtonProps) => {
  const ariaLabel = (() => {
    if (type === 'clear') {
      return 'Clear Selection';
    }
    return open ? 'Close' : 'Open';
  })();

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onClick()}
      className={scoppedClasses('control-button', rotateOnOpen && 'rotate-on-open', open && 'open')}
    >
      {type === 'clear' ? <Clear /> : <Indicator />}
    </button>
  );
};

type IdkButtonProps = {
  open?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export const IdkYet = ({ open, disabled, onClick }: IdkButtonProps) => {
  return (
    <button
      aria-label={open ? CLOSE_LABEL : OPEN_LABEL}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => onClick()}
      className={scoppedClasses('idk-key', open && 'open')}
    >
      <Indicator />
    </button>
  );
};

export default ControlButton;
