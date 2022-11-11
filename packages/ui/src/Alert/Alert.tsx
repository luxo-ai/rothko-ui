import { isString } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import type { KindProps, RothkoKind } from '../Theme/types';
import Typography from '../Typography';

type AlertProps = {
  children: React.ReactNode;
  className?: string;
  kind?: RothkoKind;
  style?: React.CSSProperties;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, kind, className, style }, ref) => {
    const renderContent = isString(children) ? (
      <Typography.body>{children}</Typography.body>
    ) : (
      children
    );
    return (
      <AlertContainerDiv style={style} className={className} kind={kind} ref={ref}>
        {renderContent}
      </AlertContainerDiv>
    );
  }
);

Alert.displayName = 'Alert';

const AlertContainerDiv = styled.div<KindProps>`
  background-color: ${({ kind = 'danger' }) => `var(--${kind}-transparent-300)`};
  padding: 1rem 1.25rem;
  font-size: 1rem;
`;

export default Alert;
