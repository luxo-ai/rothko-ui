import type { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components';
import { vuar } from '../../library/utils/vuar';
import typographyStyles from '../Typography/styles';
import type { RothkoKind } from '../../theme';
import type { LinkProps, UnderlineVariant } from './types';
import { phantomButtonStyle } from '../../library/PhantomButton';

const linkColorStyle = css<{ kind?: RothkoKind }>`
  color: ${({ kind }) =>
    vuar({ kind, element: 'typography-link', category: 'color', fallback: '#0000ee' })};
`;

const underlineVariants: Record<UnderlineVariant, FlattenSimpleInterpolation> = {
  none: css`
    text-decoration: none;
    &:hover,
    &:active,
    &:focus,
    &:visited {
      text-decoration: none;
    }
  `,
  hover: css`
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `,
  always: css`
    text-decoration: underline;
  `,
};

const baseLinkStyle = css<LinkProps>`
  ${typographyStyles.baseTextStyle}
  ${linkColorStyle}

  border: none;
  background: none;
  padding: 0px;
  text-decoration: none;
  cursor: pointer;

  ${({ underline = 'hover' }) => {
    return underlineVariants[underline];
  }};
`;

const baseLinkButtonStyle = css<LinkProps>`
  ${phantomButtonStyle}
  ${baseLinkStyle}
  // to disregard user-select stuff from phantomButtonStyle
  user-select: text;
`;

const linkStyle = css<LinkProps>`
  ${baseLinkStyle};
  ${typographyStyles.bodySizeStyle}
`;

const linkSmallStyle = css<LinkProps>`
  ${baseLinkStyle};
  ${typographyStyles.bodySmallSizeStyle}
`;

const linkButtonStyle = css<LinkProps>`
  ${baseLinkButtonStyle}
  ${typographyStyles.bodySizeStyle}
`;

const linkButtonSmallStyle = css<LinkProps>`
  ${baseLinkButtonStyle}
  ${typographyStyles.bodySmallSizeStyle}
`;

export default {
  link: linkStyle,
  linkSmall: linkSmallStyle,
  linkButton: linkButtonStyle,
  linkButtonSmall: linkButtonSmallStyle,
};
