import { CloseOutline } from '@rothko-ui/icons';
import React from 'react';

import { PhantomButton } from './PhantomButton';
import type { Size, WithAria } from '../../types';

const DEFAULT_SIZE = '1.5rem';

type AriaAttributes = 'aria-label' | 'aria-hidden';

type CloseButtonProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: Size | number;
};

export const CloseButton = ({
  id,
  className,
  style,
  onClick,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  size = DEFAULT_SIZE,
}: WithAria<CloseButtonProps, AriaAttributes>) => {
  return (
    <PhantomButton
      id={id}
      className={className}
      style={style}
      aria-label={ariaLabel || 'Close'}
      onClick={e => onClick(e)}
      aria-hidden={ariaHidden}
    >
      <CloseOutline aria-hidden width={size} height={size} />
    </PhantomButton>
  );
};
