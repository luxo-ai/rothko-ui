import styled, { css } from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import type { RothkoKind } from '../../Theme';
import { BODY_FONT_FAMILY, HEADER_FONT_FAMILY } from './constants';

type TextProps = {
  light?: boolean;
  bold?: boolean;
  italic?: boolean;
  kind?: RothkoKind;
};

const boldTextStyle = css`
  font-family: ${BODY_FONT_FAMILY.bold};
  font-weight: bold;
`;

const italicTextStyle = css`
  font-family: ${BODY_FONT_FAMILY.italic};
`;

const lightTextStyle = css`
  font-family: ${BODY_FONT_FAMILY.light};
`;

export const textStyle = css<TextProps>`
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  margin: 0.125rem 0;

  font-family: ${BODY_FONT_FAMILY.regular};
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${({ kind }) => (kind ? `var(--${kind}-500, #000)` : 'var(--color-text, #000)')};

  & > strong {
    ${boldTextStyle}
  }

  & > i {
    font-family: ${BODY_FONT_FAMILY.italic};
  }

  ${({ light }) => {
    return light ? lightTextStyle : '';
  }};

  ${({ italic }) => {
    return italic ? italicTextStyle : '';
  }};

  ${({ bold }) => {
    return bold ? boldTextStyle : '';
  }};
`;

const headerStyle = css<TextProps>`
  ${textStyle}
  font-family: ${HEADER_FONT_FAMILY.regular};
  font-weight: 700;
`;

const h1 = styled.h1<TextProps>`
  ${headerStyle}
  font-size: 2.5rem;
  line-height: 3.25rem;
`;

const h2 = styled.h2<TextProps>`
  ${headerStyle}
  font-size: 2.25rem;
  line-height: 2.75rem;
`;

const h3 = styled.h3<TextProps>`
  ${headerStyle}
  font-size: 2rem;
  line-height: 2.5rem;
`;

const h4 = styled.h4<TextProps>`
  ${headerStyle}
  font-size: 1.75rem;
  line-height: 2.25rem;
`;

const h5 = styled.h5<TextProps>`
  ${headerStyle}
  font-size: 1.5rem;
  line-height: 2rem;
`;

const h6 = styled.h6<TextProps>`
  ${headerStyle}
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const body = styled.p<TextProps>`
  ${textStyle}
  font-weight: normal;
`;

const bodySmall = styled(body)`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const title = styled(h1)`
  font-family: ${BODY_FONT_FAMILY.bold};
  font-size: 3.5rem;
  line-height: 4rem;
  font-weight: 700;
`;

const titleBig = styled(h1)`
  font-family: ${BODY_FONT_FAMILY.bold};
  font-size: clamp(3.8rem, 8vw, 6rem);
  line-height: calc(100% + 0.5rem);
  letter-spacing: -0.03rem;
  font-weight: 700;
`;

const caption = styled(body)`
  font-size: 0.75rem;
  line-height: 0.9375rem;
`;

const labelStyle = css<TextProps>`
  ${textStyle}
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.0625rem;
  line-height: 0.9375rem;
  // color: var(--basic-700);
`;

const label = styled(body)`
  ${labelStyle}
  font-family: ${BODY_FONT_FAMILY.bold};
  font-size: 0.75rem;
`;

type LinkProps = TextProps & { asText?: boolean };

const linkStyle = css<LinkProps>`
  ${textStyle}

  border: none;
  background: none;
  padding: 0px;
  text-decoration: none;

  ${({ asText }) =>
    asText
      ? ''
      : css`
          color: var(--rothko-link-color, #0000ee);
        `}

  &.underline {
    text-decoration: underline;
  }

  :hover:not(:disabled) {
    cursor: pointer;
    text-decoration: underline;
  }

  :disabled {
    color: var(--basic-500);
  }
`;

const externalLink = styled.a<LinkProps>`
  ${linkStyle};
`;

const linkButton = styled.button<LinkProps>`
  ${phantomButtonStyle}
  ${linkStyle}
`;

const inlineBody = styled.span<TextProps>`
  ${textStyle}
  font-weight: normal;
`;

export default {
  // for now
  body,
  bodySmall,
  caption,
  externalLink,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  inlineBody,
  label,
  linkButton,
  linkStyle,
  title,
  titleBig,
};
