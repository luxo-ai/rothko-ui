import { Github } from '@rothko-ui/icons';
import { Button, Flex, MaxWidth, Typography } from '@rothko-ui/ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ paddingBottom: '7rem' }}>
      <MaxWidth maxW="80rem" style={{ padding: '3rem 0', margin: '0 auto' }}>
        <Flex flexDirection="row-reverse" alignItems="center" justifyContent="space-between">
          <div style={{ width: 'fit-content' }}>
            <img src="/logo512.png" width={500} height={500} />
          </div>
          <MaxWidth maxW="34rem">
            <Typography.titleBig style={{ color: 'white' }}>
              Powerful for developers. Fast for everyone.
            </Typography.titleBig>
            <Flex columnGap="0.5rem" maxWidth="20rem" margin="2rem 0">
              <Button onClick={() => navigate('/setup')} kind="info" shape="pill">
                Get Started
              </Button>
              <Button
                accessoryLeft={({ size }) => (
                  <Github style={{ marginRight: '0.5rem' }} width={size} height={size} />
                )}
                kind="primary"
                appearance="outline"
                shape="pill"
              >
                Github
              </Button>
            </Flex>
            <Typography.h6 style={{ color: 'white', margin: '0 auto' }}>
              Solana is a decentralized blockchain built to enable scalable, user-friendly apps for
              the world.
            </Typography.h6>
          </MaxWidth>
        </Flex>
      </MaxWidth>
    </div>
  );
};

export default Home;
