import React from 'react';
import styled from 'styled-components';
import keyboardKey from 'keyboard-key';

import { classes } from '@rothko-ui/utils';

import type { KindProps, RothkoKind } from '../../theme';
import Typography from '../Typography/Typography';
import useId from '../../library/hooks/useId';
import type { WithAriaControls, WithAriaErrorMessage, WithAriaLabeling } from '../../types';
import { keyDownFactory } from '../../library/utils/keyUtils';

type WithAria<T> = WithAriaErrorMessage<WithAriaControls<WithAriaLabeling<T>>>;

export type RadioInnerProps = WithAria<{
  id?: string;
  /**
   * The content to be rendered inside the radio component.
   */
  children?: React.ReactNode;
  /**
   * The CSS class name for the radio component.
   */
  className?: string;
  /**
   * Specifies whether the radio component is disabled.
   */
  disabled?: boolean;
  /**
   * Specifies whether the radio component has an error.
   */
  error?: boolean;
  /**
   * The visual style of the radio component.
   */
  kind?: RothkoKind;
  /**
   * The callback function to be called when the radio component is selected.
   */
  onSelect: () => void;
  /**
   * Specifies whether the radio component is selected.
   */
  selected?: boolean;
  /**
   * The inline style for the radio component.
   */
  style?: React.CSSProperties;
}>;

const RadioInner = ({
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-controls': ariaControls,
  'aria-errormessage': ariaErrorMessage,
  children,
  className,
  disabled,
  error,
  kind,
  onSelect,
  selected,
  style,
}: RadioInnerProps) => {
  const labelId = useId();

  const clickRadio = () => {
    if (disabled) return;
    onSelect();
  };

  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: clickRadio });

  return (
    <RadioContainerDiv style={style} className={className}>
      <RadioOutlineDiv
        id={id}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-labelledby={!ariaLabelledBy && children ? labelId : ariaLabelledBy}
        aria-controls={ariaControls}
        aria-checked={!!selected}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        aria-errormessage={ariaErrorMessage}
        role="radio"
        className={classes({ disabled, error })}
        onClick={() => clickRadio()}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <RadioInnerDiv aria-hidden kind={kind} className={classes({ selected, error, disabled })} />
      </RadioOutlineDiv>
      {children &&
        (typeof children === 'string' ? (
          <Typography.body id={labelId}>{children}</Typography.body>
        ) : (
          <div id={labelId}>{children}</div>
        ))}
    </RadioContainerDiv>
  );
};

const RadioContainerDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center; // for children
  justify-content: flex-start;
  gap: 0.3rem;
`;

const RadioOutlineDiv = styled.div<{ $disabled?: boolean }>`
  -webkit-tap-highlight-color: transparent;
  background-color: var(--rothko-radio-border, #000);
  width: 1.25rem;
  height: 1.25rem;
  border-radius: calc(1.25rem / 2);
  padding: 0.1875rem;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const RadioInnerDiv = styled.div<KindProps>`
  -webkit-tap-highlight-color: transparent;
  background-color: var(--rothko-radio-background, #ccc);

  width: 100%;
  height: 100%;
  border-radius: 50%;

  -webkit-transition: background-color 0.1s ease;
  -moz-transition: background-color 0.1s ease;
  -ms-transition: background-color 0.1s ease;
  transition: background-color 0.1s ease;

  &.selected {
    background-color: ${({ kind }) =>
      kind
        ? `var(--rothko-${kind}-500, #281D75)`
        : `var(--rothko-radio-background_selected, #281D75)`};
  }

  &.error {
    background: var(--rothko-danger-300);
    border-color: var(--rothko-danger-500);
  }

  &.disabled {
    opacity: 0.6;
  }
`;

export default RadioInner;
