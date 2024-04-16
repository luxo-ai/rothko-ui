import { ChevronLeftOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import Typography from '../components/Typography/Typography';
import { vuar } from './utils/vuar';

type BackLinkProps = {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const BackButton = ({ disabled, onClick }: BackLinkProps) => (
  <InlineLinkButton
    role="button"
    aria-label="Back"
    aria-disabled={disabled}
    disabled={disabled}
    onClick={onClick}
  >
    <ChevronLeftOutline
      aria-hidden
      width="1.25rem"
      height="1.25rem"
      fill={vuar({
        element: 'typography-link',
        category: 'color',
        fallback: '#0000ee',
      })}
    />
    back
  </InlineLinkButton>
);

const InlineLinkButton = styled(Typography.linkButton)`
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

export default BackButton;
