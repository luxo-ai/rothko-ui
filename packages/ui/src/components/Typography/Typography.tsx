import styled, { css } from 'styled-components';
import { phantomButtonStyle } from '../../library/PhantomButton';
import type { RothkoKind } from '../../theme';
import { vuar } from '../../library/utils/vuar';

type TypographyProps = {
  bold?: boolean;
  italic?: boolean;
  kind?: RothkoKind;
  light?: boolean;
  underline?: boolean;
};

export const paragraphColorStyle = css<{ kind?: RothkoKind }>`
  color: ${({ kind }) =>
    vuar({ kind, element: 'typography-body', category: 'color', fallback: '#000' })};
`;

export const headingColorStyle = css<{ kind?: RothkoKind }>`
  color: ${({ kind }) =>
    vuar({ kind, element: 'typography-heading', category: 'color', fallback: '#000' })};
`;

export const codeColorStyle = css<{ kind?: RothkoKind }>`
  color: ${({ kind }) =>
    vuar({ kind, element: 'typography-code', category: 'color', fallback: '#000' })};
`;

export const boldFontStyle = css`
  font-family: var(--rothko-font-family-bold);
  font-weight: bold;
`;

export const italicFontStyle = css`
  font-family: var(--rothko-font-family-italic);
`;

export const lightFontStyle = css`
  font-family: var(--rothko-font-family-light);
`;

export const regularFontStyle = css`
  font-family: var(--rothko-font-family-regular);
`;

export const headingFontStyle = css`
  font-family: var(--rothko-font-family-heading);
  font-weight: 700;
`;

const codeStyle = css`
  ${codeColorStyle}
  font-family: var(--rothko-font-family-code);
  font-size: var(--rothko-font-size-code, 1rem);
  line-height: var(--rothko-line-height-code, 1.25rem);
  white-space: nowrap;

  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  background-color: rgb(153 161 179 / 0.1);
  border-radius: 0.375rem;
  white-space: nowrap;
  transition: opacity 0.25s ease 0s;
`;

export const paragraphStyle = css<TypographyProps>`
  // use font smoothing to make text more readable
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  // to make overriding in css/scc easier don't use canonical margin, opt for margin-* instead??
  margin: 0.125rem 0;

  ${paragraphColorStyle}
  ${regularFontStyle}

  & > strong {
    ${boldFontStyle}
  }

  & > i {
    ${italicFontStyle}
  }

  & > code {
    ${codeStyle}
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

  ${({ underline }) => {
    return underline
      ? css`
          text-decoration: underline;
        `
      : '';
  }};
`;

export const bodySizeStyle = css<TypographyProps>`
  font-size: var(--rothko-font-size-body, 1rem);
  line-height: var(--rothko-line-height-body, 1.5rem);
`;

export const bodySmallSizeStyle = css<TypographyProps>`
  font-size: var(--rothko-font-size-body-small, 0.875rem);
  line-height: var(--rothko-line-height-body-small, 1.25rem);
`;

const body = styled.p<TypographyProps>`
  ${paragraphStyle}
  ${bodySizeStyle}
  font-weight: normal;
`;

const bodySmall = styled(body)`
  ${bodySmallSizeStyle}
`;

const headerStyle = css<TypographyProps>`
  ${paragraphStyle}
  ${headingColorStyle}
  ${headingFontStyle}
`;

const h1 = styled.h1<TypographyProps>`
  ${headerStyle}
  font-size: var(--rothko-font-size-h1, 2.5rem);
  line-height: var(--rothko-line-height-h1, 3.25rem);
`;

const h2 = styled.h2<TypographyProps>`
  ${headerStyle}
  font-size: var(--rothko-font-size-h2, 2.25rem);
  line-height: var(--rothko-line-height-h2, 2.75rem);
`;

const h3 = styled.h3<TypographyProps>`
  ${headerStyle}
  font-size: var(--rothko-font-size-h3, 2rem);
  line-height: var(--rothko-line-height-h3, 2.5rem);
`;

const h4 = styled.h4<TypographyProps>`
  ${headerStyle}
  font-size: var(--rothko-font-size-h4, 1.75rem);
  line-height: var(--rothko-line-height-h4, 2.25rem);
`;

const h5 = styled.h5<TypographyProps>`
  ${headerStyle}
  font-size: var(--rothko-font-size-h5, 1.5rem);
  line-height: var(--rothko-line-height-h5, 2rem);
`;

const h6 = styled.h6<TypographyProps>`
  ${headerStyle}
  font-size: var(--rothko-font-size-h6, 1.25rem);
  line-height: var(--rothko-line-height-h6, 1.75rem);
`;

const caption = styled(body)`
  font-size: var(--rothko-font-size-caption, 0.75rem);
  line-height: var(--rothko-line-height-caption, 0.9375rem);
`;

const label = styled(body)`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.0625rem;
  font-family: var(--rothko-font-family-bold);
  font-size: var(--rothko-font-size-label, 0.75rem);
  line-height: var(--rothko-line-height-label, 0.9375rem);
`;

const linkStyle = css<TypographyProps>`
  ${paragraphStyle}

  border: none;
  background: none;
  padding: 0px;
  text-decoration: none;

  color: ${vuar({ element: 'typography-link', category: 'color', fallback: '#0000ee' })};

  :hover:not(:disabled) {
    cursor: pointer;
    text-decoration: underline;
  }

  :disabled {
    opacity: 0.7;
  }

  // just make this its own thing
  ${({ underline }) => {
    return underline
      ? css`
          text-decoration: underline;
        `
      : '';
  }};
`;

const externalLink = styled.a<TypographyProps>`
  ${linkStyle};
  ${bodySizeStyle}
`;

const externalLinkSmall = styled(externalLink)`
  ${bodySmallSizeStyle}
`;

const linkButton = styled.button<TypographyProps>`
  ${phantomButtonStyle}
  ${linkStyle}
  ${bodySizeStyle}
  // to disregard user-select stuff from phantomButtonStyle
  user-select: text;
`;

const linkButtonSmall = styled(linkButton)`
  ${bodySmallSizeStyle}
`;

const inlineBody = styled.span<TypographyProps>`
  ${paragraphStyle}
  ${bodySizeStyle}
`;

const inlineBodySmall = styled(inlineBody)`
  ${bodySmallSizeStyle}
`;

const code = styled.code<TypographyProps>`
  ${paragraphStyle}
  ${codeStyle}
`;

export default {
  body,
  bodySmall,
  caption,
  code,
  externalLink,
  externalLinkSmall,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  inlineBody,
  inlineBodySmall,
  label,
  linkButton,
  linkButtonSmall,
  linkStyle,
};
