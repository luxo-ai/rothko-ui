import Home from '../components/Home';
import WithProviders from '../components/WithProviders';
import type { PageProps } from '../types';

const HomePage = ({ themeMode }: PageProps) => {
  return (
    <WithProviders themeMode={themeMode}>
      <Home />
    </WithProviders>
  );
};

export default HomePage;
