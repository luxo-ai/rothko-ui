import { Globe2 } from '@rothko-ui/icons';
import { Flex, FlexItem, ToastContextProvider, Typography } from '@rothko-ui/ui';
import { themes } from 'prism-react-renderer';
import React from 'react';
import Code from '../components/Code';
import config from '../config';

const SponsorMe = () => {
  return (
    <Flex
      flexDirection="column"
      marginBottom="auto"
      marginTop="2rem"
      alignItems="center"
      justifyContent="center"
    >
      <Flex alignItems="center" flexDirection="column" flexWrap="wrap" gap="2rem">
        <Flex gap="1rem" maxWidth="34rem" alignItems="center">
          <div style={{ width: 'fit-content' }}>
            <img src="/logo.svg" width="65rem" height="65rem" alt="Rothko-UI" />
          </div>
          <div>
            <Typography.h1>Sponsor</Typography.h1>
            <Typography.body>How to support Rothko UI</Typography.body>
          </div>
        </Flex>
        <FlexItem marginTop="2rem">
          <Flex marginBottom="0.5rem" alignItems="center" gap="0.5rem">
            <FlexItem flexGrow={0}>
              <Globe2 width="1.25rem" height="1.25rem" />
            </FlexItem>
            <FlexItem>
              <Typography.body>Rothko ETH Wallet</Typography.body>
            </FlexItem>
          </Flex>
          <ToastContextProvider>
            <Code
              code={config.ethWallet}
              // darkTheme={themes.jettwaveDark}
              // lightTheme={themes.jettwaveLight}
              language="eth"
            />
          </ToastContextProvider>
        </FlexItem>
      </Flex>
    </Flex>
  );
};

export default SponsorMe;
