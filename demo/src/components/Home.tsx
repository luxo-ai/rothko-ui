import { Github } from '@rothko-ui/icons';
import { Button, Container, Flex, Typography } from '@rothko-ui/ui';

import { useRouter } from 'next/navigation';
import PaddedNavLayout from '../components/layout/PaddedNavLayout';
import config from '../config';
import { useIsMobileOrTablet } from '../hooks/useIsMobileOrTablet';
import styled from 'styled-components';

const Title = styled(Typography.h1)`
  font-family: var(--rothko-font-family-bold);
  font-size: clamp(3.5rem, 7.5vw, 6rem);
  line-height: calc(100% + 0.5rem);
  letter-spacing: -0.03rem;
  font-weight: 700;
`;

const Home = () => {
  const router = useRouter();
  const isMobileOrTablet = useIsMobileOrTablet();

  return (
    <PaddedNavLayout withoutToggle>
      <Container
        maxWidth="75rem"
        margin="0 auto"
        padding={`${isMobileOrTablet ? '1.5rem' : '3rem'} 0`}
      >
        <Flex alignItems="center">
          <Container maxWidth="34rem">
            <Title>Elevate web development. Inspire new experiences.</Title>
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
                onClick={() => window.open(config.repoUrl, '_blank')}
              >
                Github
              </Button>
            </Flex>
            <Typography.h6 style={{ margin: '0 auto', fontSize: 'clamp(1rem,2vw,1.25rem)' }}>
              Rothko UI is a modern component library designed to empower developers with sleek and
              customizable interfaces for web applications.
            </Typography.h6>
          </Container>
        </Flex>
      </Container>
    </PaddedNavLayout>
  );
};

export default Home;
