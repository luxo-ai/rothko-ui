import React from 'react';
import { Tooltip, Wrapper } from './Tooltip';
import useTooltip from './useTooltip';

type TooltipProps = {
  children?: React.ReactNode;
  delay?: number;
  kind?: 'top' | 'right' | 'bottom' | 'left';
  text: string;
};

const WithToolip = ({ children, delay, kind = 'top', text }: TooltipProps) => {
  const [active, { showTip, hideTip }] = useTooltip({ delay });
  return (
    <Wrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <Tooltip className={kind}>{text}</Tooltip>}
    </Wrapper>
  );
};

export default WithToolip;
