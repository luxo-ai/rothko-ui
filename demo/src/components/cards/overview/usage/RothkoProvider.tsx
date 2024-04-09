import { RothkoProvider, Typography } from '@rothko-ui/ui';

const App = () => {
  return (
    <RothkoProvider themeMode="dark">
      <Typography.h1>Hello World!</Typography.h1>
    </RothkoProvider>
  );
};

export default App;
