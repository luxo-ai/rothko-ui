import React from 'react';
import { CloseOutline } from '@rothko-ui/icons';
import PhantomButton from './PhantomButton';

type CloseButtonProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
};

const CloseButton = ({ className, style, onClick }: CloseButtonProps) => {
  return (
    <PhantomButton className={className} style={style} aria-label="Close" onClick={() => onClick()}>
      <CloseOutline aria-hidden width="1.5rem" height="1.5rem" />
    </PhantomButton>
  );
};

export default CloseButton;
