import { ChevronLeftOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import Typography from '../Typography/Typography';
import type {
  WithAriaLabeling,
  WithAriaControls,
  WithAriaHidden,
  WithAriaLive,
  WithAriaDisabled,
} from '../../types';

type WithAria<T> = WithAriaDisabled<
  WithAriaLive<WithAriaHidden<WithAriaControls<WithAriaHidden<WithAriaLabeling<T>>>>>
>;

type BackLinkProps = WithAria<{
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
}>;

const BackLinkButton = ({
  'aria-label': ariaLabel = 'Back',
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-labelledby': ariaLabelledBy,
  'aria-hidden': ariaHidden,
  'aria-controls': ariaControls,
  'aria-disabled': ariaDisabled,
  className,
  disabled,
  onClick,
  style,
}: BackLinkProps) => (
  <LinkButton
    role="button"
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    aria-details={ariaDetails}
    aria-labelledby={ariaLabelledBy}
    aria-hidden={ariaHidden}
    aria-controls={ariaControls}
    aria-disabled={ariaDisabled || disabled}
    className={className}
    disabled={disabled}
    onClick={onClick}
    style={style}
  >
    <ChevronLeftOutline
      aria-hidden
      width="1.25rem"
      height="1.25rem"
      fill={'var(--rothko-link, #0000ee)'}
    />
    back
  </LinkButton>
);

const LinkButton = styled(Typography.linkButton)`
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

export default BackLinkButton;
