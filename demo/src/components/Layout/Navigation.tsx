import { Heart, HeartOutline, Menu, Moon, Sun } from '@rothko-ui/icons';
import {
  Button,
  Flex,
  FlexItem,
  PhantomButton,
  Toggle,
  Typography,
  useDrawerContext,
  useRothko,
} from '@rothko-ui/ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useRothko();
  const { openDrawer } = useDrawerContext();
  return (
    <nav className={styles.nav}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" justifyContent="center" columnGap="1rem">
          <FlexItem>
            <PhantomButton className="dflx" onClick={() => openDrawer()}>
              <Menu fill="#FFF" width={24} height={24} />
            </PhantomButton>
          </FlexItem>
          <FlexItem>
            <Flex
              onClick={() => navigate('/')}
              cursor="pointer"
              alignItems="end"
              columnGap="0.25rem"
            >
              <Typography.h5 style={{ color: 'white' }}>Rothko UI</Typography.h5>
              <Typography.caption style={{ color: 'white' }}>v1.0.0</Typography.caption>
            </Flex>
          </FlexItem>
        </Flex>
        <Flex columnGap="1.25rem">
          <Button
            size="s"
            kind="primary"
            style={{ background: 'white', color: 'black' }}
            accessoryLeft={({ size }) => (
              <Heart style={{ marginRight: '0.5rem' }} fill="red" height={size} width={size} />
            )}
          >
            Sponsor
          </Button>
          <Toggle
            kind="info"
            toggled={mode === 'dark'}
            onChange={() => toggleMode()}
            onIcon={<Moon />}
            offIcon={<Sun />}
          />
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navigation;
