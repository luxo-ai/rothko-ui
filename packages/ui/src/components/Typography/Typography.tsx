import styled from 'styled-components';
import styles from './styles';
import type { TypographyProps } from './types';

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

const inlineBody = styled.span<TypographyProps>`
  ${styles.body}
`;

const inlineBodySmall = styled.span<TypographyProps>`
  ${styles.bodySmall}
`;

const code = styled.code<TypographyProps>`
  ${styles.code}
`;

const Body = styled.p<{ size?: 's' | 'm' | 'l' }>`
  ${({ size = 'm' }) => {
    if (size === 's') {
      return styles.bodySmall;
    }
    return styles.body;
  }}
`;

export default {
  body,
  bodySmall,
  caption,
  code,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  inlineBody,
  inlineBodySmall,
  label,
  p: Body,
};
