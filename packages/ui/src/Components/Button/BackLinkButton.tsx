import { ChevronLeftOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { idkFn } from '../../Theme/theme';
import type { RothkoKind } from '../../Theme/types';
import Typography from '../Typography/Typography';

type LimitedButtonProps = Pick<
  React.HTMLProps<HTMLButtonElement>,
  'className' | 'style' | 'id' | 'onClick' | 'disabled' | 'aria-label'
>;

type BackLinkProps = {
  kind?: RothkoKind;
} & LimitedButtonProps;

const BackLinkButton = ({ kind, ...buttonProps }: BackLinkProps) => (
  <LinkButton {...buttonProps} kind={kind} asText={!!kind}>
    <ChevronLeftOutline
      width="1.25rem"
      height="1.25rem"
      fill={kind ? idkFn(kind) : 'var(--rothko-link-color, #0000ee)'}
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
