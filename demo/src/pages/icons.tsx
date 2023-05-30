import { NextUIProvider } from '@nextui-org/react';
import WithNavigation from '../components/WithNavigation';
import IconsCard from '../components/cards/icons';

const Icons = () => {
  return (
    <WithNavigation selected="icons">
      <NextUIProvider>
        <IconsCard />
      </NextUIProvider>
    </WithNavigation>
  );
};

export default Icons;
