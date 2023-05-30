'use client';
import { Github } from '@rothko-ui/icons';
import { Button, Flex, MaxWidth, Typography } from '@rothko-ui/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';
import PaddedNavLayout from '../components/layout/PaddedNavLayout';
import { useIsMobileOrTablet } from '../hooks/useIsMobileOrTablet';

const REPO_URL = 'https://github.com/luxo-ai/rothko-ui';

const Home = () => {
  const router = useRouter();
  const isMobileOrTablet = useIsMobileOrTablet();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          THREE,
          color: 0x14b679,
          maxDistance: 34.0,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          baseColor: 0x1d3793,
          backgroundColor: 0x0,
          amplitudeFactor: 2.0,
          xOffset: 0.3,
          yOffset: 0.05,
          size: isMobileOrTablet ? 0.9 : 1.5,
        })
      );
    }
    return () => {
      if (vantaEffect && vantaEffect.destroy) vantaEffect?.destory?.();
    };
  }, [vantaEffect, vantaRef]);

  return (
    <PaddedNavLayout ref={vantaRef} withoutToggle>
      <MaxWidth maxW="75rem" style={{ padding: '3rem 0', margin: '0 auto' }}>
        <Flex alignItems="center">
          <MaxWidth maxW="34rem">
            <Typography.titleBig>
              Elevate web development. Inspire new experiences.
            </Typography.titleBig>
            <Flex
              columnGap={isMobileOrTablet ? '0.5rem' : '0.75rem'}
              maxWidth="20rem"
              margin="2rem 0"
            >
              <Button
                onClick={() => router.push('/overview')}
                kind="info"
                shape={isMobileOrTablet ? 'pill' : 'square'}
              >
                Get Started
              </Button>
              <Button
                shape={isMobileOrTablet ? 'pill' : 'square'}
                accessoryLeft={({ size, color }) => (
                  <Github
                    fill={color}
                    style={{ marginRight: '0.25rem' }}
                    width={size}
                    height={size}
                  />
                )}
                kind="primary"
                appearance="outline"
                // shape="pill"
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
    </PaddedNavLayout>
  );
};

export default Home;
