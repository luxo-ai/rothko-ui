import styled from 'styled-components';
import type { RothkoKind } from '../../theme';
import styles from './styles';

type TypographyProps = {
  bold?: boolean;
  italic?: boolean;
  kind?: RothkoKind;
  light?: boolean;
  underline?: boolean;
};

const body = styled.p<TypographyProps>`
  ${styles.body}
`;

const bodySmall = styled.p`
  ${styles.bodySmall}
`;

const h1 = styled.h1<TypographyProps>`
  ${styles.baseHeadingStyle}
  font-size: var(--rothko-font-size-h1, 2.5rem);
  line-height: var(--rothko-line-height-h1, 3.25rem);
`;

const h2 = styled.h2<TypographyProps>`
  ${styles.baseHeadingStyle}
  font-size: var(--rothko-font-size-h2, 2.25rem);
  line-height: var(--rothko-line-height-h2, 2.75rem);
`;

const h3 = styled.h3<TypographyProps>`
  ${styles.baseHeadingStyle}
  font-size: var(--rothko-font-size-h3, 2rem);
  line-height: var(--rothko-line-height-h3, 2.5rem);
`;

const h4 = styled.h4<TypographyProps>`
  ${styles.baseHeadingStyle}
  font-size: var(--rothko-font-size-h4, 1.75rem);
  line-height: var(--rothko-line-height-h4, 2.25rem);
`;

const h5 = styled.h5<TypographyProps>`
  ${styles.baseHeadingStyle}
  font-size: var(--rothko-font-size-h5, 1.5rem);
  line-height: var(--rothko-line-height-h5, 2rem);
`;

const h6 = styled.h6<TypographyProps>`
  ${styles.baseHeadingStyle}
  font-size: var(--rothko-font-size-h6, 1.25rem);
  line-height: var(--rothko-line-height-h6, 1.75rem);
`;

const caption = styled.p<TypographyProps>`
  ${styles.caption}
`;

const label = styled.p<TypographyProps>`
  ${styles.label}
`;

const link = styled.a<TypographyProps>`
  ${styles.link}
`;

const linkSmall = styled.a<TypographyProps>`
  ${styles.linkSmall}
`;

const linkButton = styled.button<TypographyProps>`
  ${styles.linkButton}
`;

const linkButtonSmall = styled.button<TypographyProps>`
  ${styles.linkButtonSmall}
`;

const inlineBody = styled.span<TypographyProps>`
  ${styles.body}
`;

const inlineBodySmall = styled.span<TypographyProps>`
  ${styles.bodySmall}
`;

const code = styled.code<TypographyProps>`
  ${styles.code}
`;

export default {
  body,
  bodySmall,
  caption,
  code,
  link,
  linkSmall,
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
};
