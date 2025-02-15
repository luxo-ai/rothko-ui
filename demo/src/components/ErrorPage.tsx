import { Flex, Heading2, Heading1 } from '@rothko-ui/react';
import React from 'react';
import { DesktopOnly, MobileOnly } from './dimensions';

type ErrorProps = {
  code: 400 | 404 | 500 | 501;
  header?: string;
  children?: React.ReactNode;
};

const ErrorPage = ({ code, header, children }: ErrorProps) => {
  return (
    <Flex
      height="50vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
    >
      <div>
        <DesktopOnly>
          <Flex gap="0.5rem">
            <Heading1>{code}</Heading1>
            {header && (
              <>
                <Heading1>|</Heading1>
                <Heading1>{header}</Heading1>
              </>
            )}
          </Flex>
        </DesktopOnly>
        <MobileOnly>
          <Flex flexDirection="column" gap="0.5rem" alignItems="center">
            <Heading2>{code}</Heading2>
            {header && <Heading2>{header}</Heading2>}
          </Flex>
        </MobileOnly>
      </div>
      <div>{children}</div>
    </Flex>
  );
};

export default ErrorPage;
