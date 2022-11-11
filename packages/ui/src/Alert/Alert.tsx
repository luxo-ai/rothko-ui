import { isString } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import Typography from '../Typography';
import { useTheme } from '../Theme';
import type { ThemedElement } from '../Theme/types';

type AlertProps = {
  className?: string;
  children: React.ReactNode;
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ children, ...props }, ref) => {
  const { theme } = useTheme();
  const renderContent = isString(children) ? (
    <Typography.body>{children}</Typography.body>
  ) : (
    children
  );
  return (
    <AlertContainerDiv {...props} aemikoTheme={theme} ref={ref}>
      {renderContent}
    </AlertContainerDiv>
  );
});

Alert.displayName = 'Alert';

const AlertContainerDiv = styled.div<ThemedElement>`
  background-color: ${({ aemikoTheme }) => aemikoTheme['danger-transparent-300']};
  padding: 1rem 1.25rem;
  font-size: 1rem;
`;
