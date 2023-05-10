import { Flex, Typography, WidthGeqOnly, WidthLeqOnly } from '@rothko-ui/ui';
import React from 'react';

type ErrorProps = {
  code: 400 | 404 | 500 | 501;
  header?: string;
  children?: React.ReactNode;
};

const DemoError = ({ code, header, children }: ErrorProps) => {
  return (
    <Flex
      height="50vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
    >
      <div>
        <WidthGeqOnly threshold={600}>
          <Flex gap="0.5rem">
            <Typography.h1>{code}</Typography.h1>
            {header && (
              <>
                <Typography.h1>|</Typography.h1>
                <Typography.h1>{header}</Typography.h1>
              </>
            )}
          </Flex>
        </WidthGeqOnly>
        <WidthLeqOnly threshold={600}>
          <Flex flexDirection="column" gap="0.5rem" alignItems="center">
            <Typography.h2>{code}</Typography.h2>
            {header && <Typography.h2>{header}</Typography.h2>}
          </Flex>
        </WidthLeqOnly>
      </div>
      <div>{children}</div>
    </Flex>
  );
};

export default DemoError;
