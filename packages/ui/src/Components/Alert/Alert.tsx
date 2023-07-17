import { isString } from '@rothko-ui/utils';
import React from 'react';
import styled from 'styled-components';
import { semanticTextChildrenStyle } from '../../Library/Styles';
import type { KindProps, RothkoKind } from '../../Theme/types';
import Typography from '../Typography/Typography';

type AlertProps = {
  children: React.ReactNode;
  className?: string;
  kind?: RothkoKind;
  style?: React.CSSProperties;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, kind = 'danger', className, style }, ref) => {
    return (
      <AlertContainerDiv style={style} className={className} kind={kind} ref={ref}>
        {isString(children) ? <Typography.body>{children}</Typography.body> : children}
      </AlertContainerDiv>
    );
  }
);

Alert.displayName = 'Alert';

const AlertContainerDiv = styled.div<Required<KindProps>>`
  ${semanticTextChildrenStyle}
  background-color: ${({ kind }) => `var(--rothko-${kind}-500)`};
  padding: 1rem 1.25rem;
  font-size: 1rem;
`;

export default Alert;
