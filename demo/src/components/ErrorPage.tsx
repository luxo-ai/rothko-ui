import { Flex, Typography } from '@rothko-ui/ui';
import React from 'react';
import { DesktopOnly, MobileOnly } from './Dimensions';

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
            <Typography.h1>{code}</Typography.h1>
            {header && (
              <>
                <Typography.h1>|</Typography.h1>
                <Typography.h1>{header}</Typography.h1>
              </>
            )}
          </Flex>
        </DesktopOnly>
        <MobileOnly>
          <Flex flexDirection="column" gap="0.5rem" alignItems="center">
            <Typography.h2>{code}</Typography.h2>
            {header && <Typography.h2>{header}</Typography.h2>}
          </Flex>
        </MobileOnly>
      </div>
      <div>{children}</div>
    </Flex>
  );
};

export default ErrorPage;
