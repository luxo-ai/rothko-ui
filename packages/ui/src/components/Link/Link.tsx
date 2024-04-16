import styled from 'styled-components';
import styles from './styles';
import type { LinkProps } from './types';

export const Link = styled.a<LinkProps>`
  ${styles.link}
`;

export const LinkSmall = styled.a<LinkProps>`
  ${styles.linkSmall}
`;

export const LinkButton = styled.button<LinkProps>`
  ${styles.linkButton}
  :disabled {
    cursor: not-allowed;
    text-decoration: none;
    opacity: 0.7;
  }
`;

export const LinkButtonSmall = styled.button<LinkProps>`
  ${styles.linkButtonSmall}
  :disabled {
    cursor: not-allowed;
    text-decoration: none;
    opacity: 0.7;
  }
`;
