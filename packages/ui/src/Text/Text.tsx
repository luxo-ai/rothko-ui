import styled, { css } from 'styled-components';
import { AemikoKind, GreyScale, greyScale, theme, Theme } from '../Theme';
import { BODY_FONT_FAMILY, HEADER_FONT_FAMILY } from './common';

export type TextProps = {
  kind?: AemikoKind | GreyScale;
};

export type LinkButtonProps = TextProps;

const getTextColor = (kind?: TextProps['kind']) => {
  if (kind && kind in greyScale) {
    return greyScale[kind as GreyScale];
  }
  if (kind && `${kind}-500` in theme) {
    return theme[`${kind}-500` as keyof Theme];
  }
  return '#000000'; // 'rgb(30, 34, 51)';
};

export const textStyle = css<TextProps>`
  font-family: ${BODY_FONT_FAMILY.regular};
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0.125rem 0;
  color: ${({ kind }) => getTextColor(kind)};
  &.light {
    font-family: ${BODY_FONT_FAMILY.light};
  }
  & > strong {
    font-family: ${BODY_FONT_FAMILY.bold};
    font-weight: bold;
  }
  & > i {
    font-family: ${BODY_FONT_FAMILY.italic};
  }
`;

export const linkStyle = css<TextProps>`
  border: none;
  background: none;
  font-family: ${BODY_FONT_FAMILY.regular};
  font-size: 1rem;
  line-height: 1.25rem;
  padding: 0px;
  text-decoration: none;
  color: ${({ kind = 'info' }) => getTextColor(kind)};

  :hover:not(:disabled) {
    cursor: pointer;
    text-decoration: underline;
  }
  :disabled {
    color: ${theme['basic-500']};
  }
`;

export const linkButtonStyle = css<LinkButtonProps>`
  &.no-underline {
    text-decoration: none;
    &:hover,
    &:visited,
    &:link,
    &:active {
      border: 0;
      text-decoration: none;
    }
  }
`;

export const headerStyle = css<TextProps>`
  ${textStyle}
  // is there a bol for cera?
  font-family: ${HEADER_FONT_FAMILY.regular};
  & > i {
    font-family: ${HEADER_FONT_FAMILY.italic};
  }
  font-weight: bold;
`;

export const h1 = styled.h1<TextProps>`
  ${headerStyle}
  font-size: 2rem;
`;

export const h2 = styled.h2<TextProps>`
  ${headerStyle}
  font-size: 1.5rem;
`;

export const h3 = styled.h3<TextProps>`
  ${headerStyle}
  font-size: 1.17rem;
`;

export const h4 = styled.h4<TextProps>`
  ${headerStyle}
  font-size: 1rem;
`;

export const h5 = styled.h5<TextProps>`
  ${headerStyle}
  font-size: 0.83rem;
`;

export const h6 = styled.h6<TextProps>`
  ${headerStyle}
  font-size: 0.67rem;
`;

export const body = styled.p<TextProps>`
  ${textStyle}
  font-weight: normal;
`;

export const bodyLight = styled(body)`
  font-family: ${BODY_FONT_FAMILY.light};
`;

export const bodyItalic = styled(body)`
  font-family: ${BODY_FONT_FAMILY.italic};
`;

export const bodyBold = styled(body)`
  font-family: ${BODY_FONT_FAMILY.bold};
  font-weight: bold;
`;

export const bodySmall = styled(body)`
  font-size: 0.875rem;
  // line-height: 1.125rem;
`;

export const bodySmallBold = styled(bodySmall)`
  font-family: ${BODY_FONT_FAMILY.bold};
  font-weight: bold;
`;

export const title = styled(body)`
  font-family: ${BODY_FONT_FAMILY.bold};
  font-size: 3.5rem;
`;

export const bodyBig = styled(body)`
  font-size: 1.25rem;
`;

export const caption = styled(body)`
  font-size: 0.75rem;
  line-height: 0.9375rem;
`;

export const captionBold = styled(caption)`
  font-family: ${BODY_FONT_FAMILY.bold};
  font-weight: bold;
`;

export const labelBase = css<TextProps>`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.0625rem;
  line-height: 0.9375rem;
  color: ${({ kind = 'basic' }) => getTextColor(kind)};
`;

export const label = styled(body)`
  ${labelBase}
  font-family: ${BODY_FONT_FAMILY.bold};
  font-size: 0.75rem;
`;

export const labelLite = styled(body)`
  ${labelBase}
  font-family: ${BODY_FONT_FAMILY.regular};
  font-weight: normal;
  font-size: 0.83rem;
`;

export const externalLink = styled.a<TextProps>`
  ${linkStyle};
`;
