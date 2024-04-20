import React from 'react';
import styled, { css } from 'styled-components';

import { isString } from '@rothko-ui/utils';

import { semanticTextChildrenStyle } from '../../library/Styles';
import { vuar } from '../../library/utils/vuar';
import type { RothkoKind } from '../../theme/types';
import type { WithAriaHidden, WithAriaLabeling, WithAriaLive } from '../../types';
import Typography from '../Typography/Typography';

type WithAria<T> = WithAriaHidden<WithAriaLabeling<WithAriaLive<T>>>;

type AlertProps = WithAria<{
  id?: string;
  /**
   * The content of the Alert component.
   */
  children: React.ReactNode;
  /**
   * The class name for the Alert component.
   */
  className?: string;
  /**
   * The kind of Alert component.
   * @default: 'danger'
   */
  kind?: RothkoKind;
  /**
   * The inline style for the Alert component.
   */
  style?: React.CSSProperties;
  /**
   * The appearance style of the Alert component.
   * @default 'filled'
   */
  appearance?: 'filled' | 'outline';
}>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-details': ariaDetails,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-live': ariaLive,
      'aria-hidden': ariaHidden,
      children,
      kind = 'danger',
      className,
      style,
      id,
      appearance = 'filled',
    },
    ref
  ) => {
    return (
      <AlertContainerDiv
        id={id}
        role="alert"
        appearance={appearance}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-details={ariaDetails}
        aria-hidden={ariaHidden}
        aria-live={ariaLive}
        className={className}
        kind={kind}
        ref={ref}
        style={style}
      >
        {isString(children) ? <Typography.body>{children}</Typography.body> : children}
      </AlertContainerDiv>
    );
  }
);

Alert.displayName = 'Alert';

const AlertContainerDiv = styled.div<{ kind: RothkoKind; appearance: 'filled' | 'outline' }>`
  ${({ appearance, kind }) => {
    return appearance === 'filled'
      ? css`
          ${semanticTextChildrenStyle}
          background-color: ${vuar({ kind, category: 'background' })};
        `
      : css`
          border: 1px solid ${vuar({ kind, category: 'background' })};
          color: ${vuar({ kind, category: 'color' })};
        `;
  }}
  padding: 1rem 1.25rem;
  font-size: 1rem;
`;

export default Alert;
