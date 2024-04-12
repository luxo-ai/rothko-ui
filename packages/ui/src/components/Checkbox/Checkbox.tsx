import { classes } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import React from 'react';
import styled from 'styled-components';
import type { KindProps, RothkoKind } from '../../theme/types';
import { keyDownFactory } from '../../utils/keyUtils';
import Typography from '../Typography/Typography';
import type {
  WithAriaControls,
  WithAriaDisabled,
  WithAriaExpanded,
  WithAriaHasPopup,
  WithAriaHidden,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
  WithAriaErrorMessage,
} from '../../types';
import useId from '../../library/Hookz/useId';

type WithAria<T> = WithAriaErrorMessage<
  WithAriaRequired<
    WithAriaHasPopup<
      WithAriaExpanded<
        WithAriaHidden<WithAriaDisabled<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>>
      >
    >
  >
>;

type CheckboxProps = WithAria<{
  id?: string;
  required?: boolean;
  checked?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  kind?: RothkoKind;
  onChange?: (val: boolean) => void;
  style?: React.CSSProperties;
  withCheck?: boolean;
  errorText?: string;
}>;

const Checkbox = ({
  id: idProp,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-hidden': ariaHidden,
  'aria-controls': ariaControls,
  'aria-haspopup': ariaHasPopup,
  'aria-expanded': ariaExpanded,
  'aria-disabled': ariaDisabled,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  'aria-errormessage': ariaErrorMessage,
  checked,
  children,
  className,
  disabled,
  error,
  kind,
  onChange,
  style,
  withCheck,
  errorText = 'Invalid',
  required,
}: CheckboxProps) => {
  const id = useId(idProp);
  const errorMessageId = `${id}-error-text`;
  const labelId = `${id}-label`;

  const clickCheckbox = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: clickCheckbox });

  return (
    <CheckboxContainerDiv style={style} className={className}>
      <CheckboxDiv
        id={id}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-labelledby={!ariaLabelledBy && children ? labelId : ariaLabelledBy}
        aria-hidden={ariaHidden}
        aria-controls={ariaControls}
        aria-haspopup={ariaHasPopup}
        aria-expanded={ariaExpanded}
        aria-invalid={ariaInvalid || error}
        aria-required={ariaRequired}
        aria-checked={!!checked}
        aria-disabled={ariaDisabled || disabled}
        aria-label={ariaLabel}
        aria-errormessage={!ariaErrorMessage && error ? errorMessageId : ariaErrorMessage}
        className={classes({ error, checked, disabled, ['with-check']: withCheck })}
        kind={kind}
        onClick={() => clickCheckbox()}
        onKeyDown={onKeyDown}
        role="checkbox"
        tabIndex={0}
      />
      {children &&
        (typeof children === 'string' ? (
          <Typography.body id={labelId}>{children}</Typography.body>
        ) : (
          <div id={labelId}>{children}</div>
        ))}
      {error && (
        <Typography.body id={errorMessageId} kind="danger">
          {errorText}
        </Typography.body>
      )}
    </CheckboxContainerDiv>
  );
};

const CheckboxContainerDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center; // for children
  justify-content: flex-start;
  gap: 0.5rem;
`;

const CheckboxDiv = styled.div<KindProps>`
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  background-color: var(--rothko-checkbox-background, #dee7f5);
  cursor: pointer;

  width: 1.125rem;
  height: 1.125rem;

  border-radius: 1px;
  padding: 0.25rem;

  -webkit-transition: background-color 0.1s ease;
  -moz-transition: background-color 0.1s ease;
  -ms-transition: background-color 0.1s ease;
  transition: background-color 0.1s ease;

  &.checked {
    background-color: ${({ kind = 'success' }) => `var(--rothko-${kind}-500)`};

    &.with-check {
      background-image: url('data:image/svg+xml,%0A%20%20%20%20%3Csvg%20width%3D%2217%22%20height%3D%2213%22%20viewBox%3D%220%200%2017%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M6.50002%2012.6L0.400024%206.60002L2.60002%204.40002L6.50002%208.40002L13.9%200.900024L16.1%203.10002L6.50002%2012.6Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      background-origin: content-box;
    }
  }

  &:focus-visible {
    outline: 1px solid var(--rothko-info-300);
  }

  &.error:not(:focus) {
    background-color: var(--rothko-danger-transparent-500);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Checkbox;
