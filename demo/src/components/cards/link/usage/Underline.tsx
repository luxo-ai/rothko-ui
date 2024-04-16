import { Flex, Link } from '@rothko-ui/ui';

const App = () => {
  return (
    <Flex gap="1rem">
      <Link underline="always">Always</Link>
      <Link underline="hover">Hover</Link>
      <Link underline="none">None</Link>
    </Flex>
  );
};

export default App;
