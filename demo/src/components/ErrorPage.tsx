import React from 'react';

import { DesktopOnly, MobileOnly } from './dimensions';
import { Flex } from './flex';

type ErrorProps = {
  code: 400 | 404 | 500 | 501;
  header?: string;
  children?: React.ReactNode;
};

const ErrorPage = ({ code, header, children }: ErrorProps) => {
  return (
    <Flex
      style={{ height: '50vh' }}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
    >
      <div>
        <DesktopOnly>
          <Flex gap="0.5rem">
            <h1>{code}</h1>
            {header && (
              <>
                <h1>|</h1>
                <h1>{header}</h1>
              </>
            )}
          </Flex>
        </DesktopOnly>
        <MobileOnly>
          <Flex flexDirection="column" gap="0.5rem" alignItems="center">
            <h2>{code}</h2>
            {header && <h2>{header}</h2>}
          </Flex>
        </MobileOnly>
      </div>
      <div>{children}</div>
    </Flex>
  );
};

export default ErrorPage;
