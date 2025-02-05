import React, { useEffect, useRef } from 'react';

import { ChevronDownOutline, CloseOutline } from '@rothko-ui/icons';
import { scopedClasses } from '../../utils/classes';

import style from './ControlButton.module.scss';

const sc = scopedClasses(style);

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

  return (
    <button
      aria-label={CONTROL_STATE_TO_LABEL[state]}
      disabled={disabled}
      onClick={() => callbackProps[`on${state}`]?.()}
      className={sc('control-button', wasOpened && 'open')}
    >
      {state === ControlState.Clear ? (
        <CloseOutline aria-hidden width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <ChevronDownOutline aria-hidden width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </button>
  );
};
