import React from 'react';
import { Tooltip, Wrapper } from './Tooltip';
import useTooltip from './useTooltip';

type TooltipProps = {
  text: string;
  kind?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  children?: React.ReactNode;
};

export const WithToolip: React.FC<TooltipProps> = ({ children, text, delay, kind = 'top' }) => {
  const [active, { showTip, hideTip }] = useTooltip({ delay });
  return (
    <Wrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <Tooltip className={kind}>{text}</Tooltip>}
    </Wrapper>
  );
};
