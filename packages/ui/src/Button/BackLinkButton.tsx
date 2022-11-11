import { ChevronLeftOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { idkFn } from '../Theme/themeV2';
import type { RothkoKind } from '../Theme/types';
import Typography from '../Typography/Typography';

type LimitedButtonProps = Pick<
  React.HTMLProps<HTMLButtonElement>,
  'className' | 'style' | 'id' | 'onClick' | 'disabled' | 'aria-label'
>;

type BackLinkProps = {
  kind?: RothkoKind;
} & LimitedButtonProps;

export const BackLinkButton = ({ kind = 'info', ...buttonProps }: BackLinkProps) => (
  <LinkButton {...buttonProps} kind={kind}>
    <ChevronLeftOutline width="1.25rem" height="1.25rem" fill={idkFn(kind)} />
    back
  </LinkButton>
);

const LinkButton = styled(Typography.linkButton)`
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;
