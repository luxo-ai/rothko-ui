import React from 'react';
import { Tooltip, TooltipContainerDiv } from './Tooltip';
import useTooltip from './useTooltip';

type TooltipProps = {
  children?: React.ReactNode;
  delay?: number;
  kind?: 'top' | 'right' | 'bottom' | 'left';
  text: string;
};

const WithToolip = ({ children, delay, kind = 'top', text }: TooltipProps) => {
  const [active, { showToolTip, hideToolTip }] = useTooltip({ delay });
  return (
    <TooltipContainerDiv onMouseEnter={showToolTip} onMouseLeave={hideToolTip}>
      {children}
      {active && <Tooltip className={kind}>{text}</Tooltip>}
    </TooltipContainerDiv>
  );
};

export default WithToolip;
