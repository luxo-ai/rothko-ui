import { ChevronDownOutline, CloseOutline } from '@rothko-ui/icons';
import React, { useEffect, useRef } from 'react';

import { PhantomButton } from './PhantomButton';
import { classes } from '../../utils/classes';

export enum ControlState {
  Clear = 'Clear',
  Open = 'Open',
  Close = 'Close',
}

const CONTROL_STATE_TO_LABEL: Record<ControlState, string> = {
  [ControlState.Clear]: 'Clear Selection',
  [ControlState.Open]: 'Open',
  [ControlState.Close]: 'Close',
};

type CallbackProps = {
  [key in `on${ControlState}`]?: () => void;
};

const ICON_SIZE = '1rem';

interface ControlButtonProps extends CallbackProps {
  disabled?: boolean;
  state: ControlState;
}

export const ControlButton = ({ state, disabled, ...callbackProps }: ControlButtonProps) => {
  const previousStateRef = useRef<ControlState | null>(null);

  // use effect runs after render. Whereas previousState (below) is set before render
  useEffect(() => {
    previousStateRef.current = state;
  }, [state]);

  const previousState = previousStateRef.current;
  const wasOpened =
    state === ControlState.Open && (previousState === ControlState.Close || previousState == null);

  const controlButtonClasses = classes(
    'flex',
    'items-center',
    'top-[0.51rem]',
    'right-[0.51rem]',
    'cursor-pointer',
    'm-[-1rem]',
    'h-auto',
    'w-auto',
    'p-[0.51rem_1rem]',
    'z-9',
    'transition-transform duration-[125ms] ease-linear',
    !wasOpened && 'rotate-0',
    wasOpened && 'rotate-180'
  );

  return (
    <PhantomButton
      aria-label={CONTROL_STATE_TO_LABEL[state]}
      disabled={disabled}
      onClick={() => callbackProps[`on${state}`]?.()}
      className={controlButtonClasses}
    >
      {state === ControlState.Clear ? (
        <CloseOutline aria-hidden width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <ChevronDownOutline aria-hidden width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </PhantomButton>
  );
};
