import { ChevronLeftOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import Typography from '../Typography/Typography';

type BackLinkProps = {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

const BackLinkButton = ({ ariaLabel, className, disabled, onClick, style }: BackLinkProps) => (
  <LinkButton
    aria-label={ariaLabel}
    className={className}
    disabled={disabled}
    onClick={onClick}
    style={style}
  >
    <ChevronLeftOutline width="1.25rem" height="1.25rem" fill={'var(--rothko-link, #0000ee)'} />
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
