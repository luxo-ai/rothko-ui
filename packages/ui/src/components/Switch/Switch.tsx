import { classes, isString } from '@rothko-ui/utils';
import keyboardKey from 'keyboard-key';
import type { CSSProperties } from 'react';
import React from 'react';
import styled from 'styled-components';
import { hideChromeBrowserOutline } from '../../library/Styles';
import type { RothkoKind } from '../../theme/types';
import { keyDownFactory } from '../../library/utils/keyUtils';
import { Typography } from '../Typography';
import type {
  WithAriaControls,
  WithAriaDisabled,
  WithAriaErrorMessage,
  WithAriaExpanded,
  WithAriaHasPopup,
  WithAriaHidden,
  WithAriaInvalid,
  WithAriaLabeling,
  WithAriaRequired,
} from '../../types';
import useId from '../../library/hooks/useId';
import { vuar } from '../../library/utils/vuar';

type WithAria<T> = WithAriaErrorMessage<
  WithAriaRequired<
    WithAriaHasPopup<
      WithAriaExpanded<
        WithAriaHidden<WithAriaDisabled<WithAriaInvalid<WithAriaControls<WithAriaLabeling<T>>>>>
      >
    >
  >
>;

type SwitchProps = WithAria<{
  id?: string;
  /**
   * The content to be rendered inside the Switch component.
   */
  children?: React.ReactNode;
  /**
   * The CSS class name to be applied to the Switch component.
   */
  className?: string;
  /**
   * Specifies whether the Switch component is disabled.
   */
  disabled?: boolean;
  /**
   * Specifies whether the Switch component has an error state.
   */
  error?: boolean;
  /**
   * The error text to be displayed when the Switch component is in an error state.
   * @default 'Invalid'
   */
  errorText?: string;
  /**
   * The visual style of the Switch component.
   */
  kind?: RothkoKind;
  /**
   * The icon element to be displayed when the Switch component is in the "off" state.
   */
  offIcon?: JSX.Element;
  /**
   * The event handler called when the Switch component's value changes.
   */
  onChange: (Switchd: boolean) => void;
  /**
   * The icon element to be displayed when the Switch component is in the "on" state.
   */
  onIcon?: JSX.Element;
  /**
   * Specifies whether the Switch component is required.
   */
  required?: boolean;
  /**
   * The inline style object to be applied to the Switch component.
   */
  style?: CSSProperties;
  /**
   * Specifies whether the Switch component is selected.
   */
  selected?: boolean;
}>;

const Switch = ({
  children,
  className,
  disabled,
  kind,
  offIcon,
  onChange,
  onIcon,
  style,
  selected,
  error,
  errorText = 'Invalid',
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
  id,
}: SwitchProps) => {
  const labelId = useId();
  const errorMessageId = useId();

  const handleChange = () => {
    if (disabled) return;
    onChange(!selected);
  };

  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: handleChange });

  return (
    <SwitchContainerDiv className={className} style={style}>
      <OuterSwitchDiv
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
        aria-checked={!!selected}
        aria-disabled={ariaDisabled || disabled}
        aria-label={ariaLabel}
        aria-errormessage={!ariaErrorMessage && error ? errorMessageId : ariaErrorMessage}
        $selected={selected}
        className={classes({ disabled, error })}
        kind={kind}
        onClick={handleChange}
        onKeyDown={onKeyDown}
        role="switch"
        tabIndex={0}
      >
        <InnerSwitchDiv aria-hidden className={classes(selected && 'active')}>
          {selected ? onIcon && <>{onIcon}</> : offIcon && <>{offIcon}</>}
        </InnerSwitchDiv>
      </OuterSwitchDiv>
      {children &&
        (isString(children) ? (
          <Typography.body id={labelId}>{children}</Typography.body>
        ) : (
          <div id={labelId}>{children}</div>
        ))}
      {error && (
        <Typography.body id={errorMessageId} kind="danger">
          {errorText}
        </Typography.body>
      )}
    </SwitchContainerDiv>
  );
};

const SwitchContainerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

type OuterSwitchDivProp = {
  kind?: RothkoKind;
  $selected?: boolean;
};

const OuterSwitchDiv = styled.div<OuterSwitchDivProp>`
  flex: 0 0 auto;
  -webkit-tap-highlight-color: transparent;
  ${hideChromeBrowserOutline}

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;
  user-select: none;
  outline: none;

  width: 3rem;
  height: calc(1.4rem + 2px);

  border: 1px solid ${vuar({ element: 'switch', category: 'border' })};
  border-radius: 50vmin;

  background-color: ${({ $selected, kind }) => {
    if ($selected) {
      return vuar({
        kind,
        element: 'switch',
        category: 'background',
        focused: true,
        fallback: '#000',
      });
    }
    return vuar({ element: 'switch', category: 'background', fallback: '#dee7f5' });
  }};

  -webkit-transition: background-color 0.5s ease;
  -moz-transition: background-color 0.5s ease;
  -ms-transition: background-color 0.5s ease;
  transition: background-color 0.5s ease;

  &:focus-visible {
    :after {
      content: '';
      display: block;
      position: absolute;
      inset: -0.13rem;
      border-radius: 50vmin;
      border: 0.125rem solid ${({ kind }) => vuar({ kind, category: 'border' })};
    }
  }

  &.error:not(:focus):not(.focus) {
    // background-color: ?
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const InnerSwitchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.4rem;
  height: 1.4rem;
  margin: 0 1px;

  background-color: #ffffff;
  border-radius: 50%;

  -webkit-transition: transform 0.15s ease-out 0s;
  -moz-transition: transform 0.15s ease-out 0s;
  -ms-transition: transform 0.15s ease-out 0s;
  transition: transform 0.15s ease-out 0s;

  &.active {
    // outer switch width - width of inner switch - horizontal margin - offset
    transform: translateX(calc(3rem - 1.4rem - 1px - 2px));
  }
`;

export default Switch;
