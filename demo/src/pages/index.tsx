'use client';
import { Github } from '@rothko-ui/icons';
import { Button, Flex, MaxWidth, Typography, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <MaxWidth maxW="80rem" style={{ padding: '3rem 0', margin: '0 auto' }}>
        <Flex
          flexDirection="row-reverse"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap="2rem"
        >
          <div style={{ width: 'fit-content' }}>
            <img src="/logo.svg" width="250rem" height="250rem" />
          </div>
          <MaxWidth maxW="34rem">
            <Typography.titleBig>Powerful for developers. Fast for everyone.</Typography.titleBig>
            <Flex columnGap="0.5rem" maxWidth="20rem" margin="2rem 0">
              <Button onClick={() => router.push('/component/accordion')} kind="info" shape="pill">
                Get Started
              </Button>
              <Button
                accessoryLeft={({ size }) => (
                  <Github
                    fill="black"
                    style={{ marginRight: '0.5rem' }}
                    width={size}
                    height={size}
                  />
                )}
                kind="primary"
                appearance="outline"
                shape="pill"
              >
                Github
              </Button>
            </Flex>
            <Typography.h6 style={{ margin: '0 auto' }}>
              Solana is a decentralized blockchain built to enable scalable, user-friendly apps for
              the world.
            </Typography.h6>
          </MaxWidth>
        </Flex>
      </MaxWidth>
    </div>
  );
};

export default Page;
