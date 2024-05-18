import { ChevronLeftOutline } from '@rothko-ui/icons';
import React from 'react';
import { vuar } from '../utils/vuar';
import { LinkButton } from '../../components/Link';
import styles from './Button.module.scss';

type BackLinkProps = {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const BackButton = ({ disabled, onClick }: BackLinkProps) => (
  <LinkButton
    underline="hover"
    role="button"
    aria-label="Back"
    aria-disabled={disabled}
    disabled={disabled}
    onClick={onClick}
    className={styles['back-button']}
  >
    <ChevronLeftOutline
      aria-hidden
      width="1.25rem"
      height="1.25rem"
      fill={vuar({
        element: 'typography-link',
        category: 'color',
        fallback: '#0000ee',
      })}
    />
    back
  </LinkButton>
);

export default BackButton;
