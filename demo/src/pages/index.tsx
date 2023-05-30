'use client';
import { Github } from '@rothko-ui/icons';
import { Button, Flex, MaxWidth, Typography } from '@rothko-ui/ui';
import { useRouter } from 'next/navigation';
import React from 'react';

const REPO_URL = 'https://github.com/luxo-ai/rothko-ui';

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
          columnGap="5rem"
          rowGap="2rem"
        >
          <div
            style={{
              // width: 'fit-content',
              marginTop: -32,
              // width: 'clamp(64rem, 10vw, 250rem)',
              //  height: 'clamp(64rem, 10vw, 250rem)',
            }}
          >
            <img
              src="/logo.svg"
              //  width="100%"
              //  height="100%"
              width="clamp(5rem, 100vw 350rem)"
              height="clamp(5rem, 100vw, 350rem)"
              //   width="clamp(64rem, 10vw, 250rem)"
              //   height="clamp(64rem, 10vw, 250rem)"
              // style={{ width: 'clamp(64rem, 10vw, 250rem)', height: 'clamp(64rem, 10vw, 250rem)' }}
              alt="Rothko-UI"
            />
          </div>
          <MaxWidth maxW="34rem">
            <Typography.titleBig>
              Elevate web development. Inspire new experiences.
            </Typography.titleBig>
            <Flex columnGap="0.5rem" maxWidth="20rem" margin="2rem 0">
              <Button onClick={() => router.push('/overview')} kind="info" shape="pill">
                Get Started
              </Button>
              <Button
                accessoryLeft={({ size, color }) => (
                  <Github
                    fill={color}
                    style={{ marginRight: '0.5rem' }}
                    width={size}
                    height={size}
                  />
                )}
                kind="primary"
                appearance="outline"
                shape="pill"
                onClick={() => window.open(REPO_URL, '_blank')}
              >
                Github
              </Button>
            </Flex>
            <Typography.h6 style={{ margin: '0 auto', fontSize: 'clamp(1rem,2vw,1.25rem)' }}>
              Rothko UI is a modern component library designed to empower developers with sleek and
              customizable interfaces for web applications.
            </Typography.h6>
          </MaxWidth>
        </Flex>
      </MaxWidth>
    </div>
  );
};

export default Page;
