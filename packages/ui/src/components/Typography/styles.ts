import { css } from 'styled-components';
import type { RothkoKind } from '../../theme';
import { vuar } from '../../library/utils/vuar';
import type { TypographyProps } from './types';

// -------- START COLORS --------
const bodyColorStyle = css<{ kind?: RothkoKind }>`
  color: ${({ kind }) =>
    vuar({ kind, element: 'typography-body', category: 'color', fallback: '#000' })};
`;

const headingColorStyle = css<{ kind?: RothkoKind }>`
  color: ${({ kind }) =>
    vuar({ kind, element: 'typography-heading', category: 'color', fallback: '#000' })};
`;

const codeColorStyle = css<{ kind?: RothkoKind }>`
  color: ${({ kind }) =>
    vuar({ kind, element: 'typography-code', category: 'color', fallback: '#000' })};
`;
// -------- END COLORS --------

// -------- START FONT --------
const boldFontStyle = css`
  font-family: var(--rothko-font-family-bold);
  font-weight: bold;
`;

const italicFontStyle = css`
  font-family: var(--rothko-font-family-italic);
`;

const lightFontStyle = css`
  font-family: var(--rothko-font-family-light);
`;

const regularFontStyle = css`
  font-family: var(--rothko-font-family-regular);
`;

const headingFontStyle = css`
  font-family: var(--rothko-font-family-heading);
  font-weight: 700;
`;

const codeFontStyle = css`
  font-family: var(--rothko-font-family-code);
`;
// -------- END FONT --------

// -------- START SIZE --------
const bodySizeStyle = css`
  font-size: var(--rothko-font-size-body, 1rem);
  line-height: var(--rothko-line-height-body, 1.5rem);
`;

const bodySmallSizeStyle = css`
  font-size: var(--rothko-font-size-body-small, 0.875rem);
  line-height: var(--rothko-line-height-body-small, 1.25rem);
`;

const captionSizeStyle = css`
  font-size: var(--rothko-font-size-caption, 0.75rem);
  line-height: var(--rothko-line-height-caption, 0.9375rem);
`;

const labelSizeStyle = css`
  font-size: var(--rothko-font-size-label, 0.75rem);
  line-height: var(--rothko-line-height-label, 0.9375rem);
`;

const codeSizeStyle = css`
  font-size: var(--rothko-font-size-code, 1rem);
  line-height: var(--rothko-line-height-code, 1.25rem);
`;
// -------- END BODY SIZE --------

// -------- START BASE STYLES --------
const baseTextStyle = css<TypographyProps>`
  // use font smoothing to make text more readable
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  // to make overriding in css/scc easier don't use canonical margin, opt for margin-* instead??
  margin: 0.125rem 0;

  ${bodyColorStyle}
  ${regularFontStyle}

  & > strong {
    ${boldFontStyle}
  }

  & > i {
    ${italicFontStyle}
  }

  ${({ light }) => {
    return light ? lightFontStyle : '';
  }};

  ${({ italic }) => {
    return italic ? italicFontStyle : '';
  }};

  ${({ bold }) => {
    return bold ? boldFontStyle : '';
  }};
`;

const baseHeadingStyle = css<TypographyProps>`
  ${baseTextStyle}
  ${headingColorStyle}
  ${headingFontStyle}
`;

// -------- END BASE STYLES --------

const bodyStyle = css<TypographyProps>`
  ${baseTextStyle}
  ${bodySizeStyle}
`;

const bodySmallStyle = css<TypographyProps>`
  ${baseTextStyle}
  ${bodySmallSizeStyle}
`;

const captionStyle = css<TypographyProps>`
  ${baseTextStyle}
  ${captionSizeStyle}
`;

const labelStyle = css<TypographyProps>`
  ${baseTextStyle}
  ${boldFontStyle}
  ${labelSizeStyle}
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
`;

const codeStyle = css`
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  ${codeSizeStyle}
  ${codeColorStyle}
  ${codeFontStyle}
  white-space: nowrap;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  background-color: rgb(153 161 179 / 0.1);
  border-radius: 0.375rem;
  // white-space: nowrap;
  white-space: pre-wrap;
  transition: opacity 0.25s ease 0s;
`;

export default {
  body: bodyStyle,
  bodySmall: bodySmallStyle,
  caption: captionStyle,
  code: codeStyle,
  label: labelStyle,
  baseHeadingStyle,
  baseTextStyle,
  boldFontStyle,
  regularFontStyle,
  italicFontStyle,
  lightFontStyle,
  bodySizeStyle,
  bodySmallSizeStyle,
};
