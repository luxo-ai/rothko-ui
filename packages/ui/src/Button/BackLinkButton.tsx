import { ChevronLeftOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { linkStyle, TextProps } from '../Text/Text';
import { useKindTheme } from '../Theme/ThemeContext';
import { AemikoKind, GreyScale } from '../Theme/types';

type LimitedButtonProps = Pick<
  React.HTMLProps<HTMLButtonElement>,
  'className' | 'style' | 'id' | 'onClick' | 'disabled' | 'aria-label'
>;

type BackLinkProps = {
  kind?: AemikoKind | GreyScale;
} & LimitedButtonProps;

export const BackLinkButton = ({ kind = 'info', ...buttonProps }: BackLinkProps) => {
  const [themeColorer] = useKindTheme(kind);
  return (
    <LinkButton {...buttonProps} kind={kind}>
      <ChevronLeftOutline width="1.25rem" height="1.25rem" fill={themeColorer()} />
      back
    </LinkButton>
  );
};

const LinkButton = styled.button<TextProps>`
  ${linkStyle}
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;
