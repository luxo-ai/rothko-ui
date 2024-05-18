import { Globe2 } from '@rothko-ui/icons';
import { Flex, FlexItem, Typography } from '@rothko-ui/ui';
import { TextCode } from '../components/Code';
import config from '../config';

const SponsorMe = () => {
  return (
    <Flex
      flexDirection="column"
      marginBottom="auto"
      alignItems="center"
      justifyContent="center"
      gap="2rem"
    >
      <Flex gap="1rem" maxWidth="34rem" alignItems="center">
        <img src="/logo.svg" width="65rem" height="65rem" alt="Rothko-UI" />
        <div>
          <Typography.h1>Sponsor</Typography.h1>
          <Typography.body>How to support Rothko UI</Typography.body>
        </div>
      </Flex>
      <FlexItem marginTop="2rem">
        <Flex marginBottom="0.5rem" alignItems="center" gap="0.5rem">
          <FlexItem display="flex" flexGrow={0}>
            <Globe2 width="1.125rem" height="1.125rem" />
          </FlexItem>
          <FlexItem>
            <Typography.body>Rothko ETH Wallet</Typography.body>
          </FlexItem>
        </Flex>
        <TextCode sourceCode={config.ethWallet} />
      </FlexItem>
    </Flex>
  );
};

export default SponsorMe;
