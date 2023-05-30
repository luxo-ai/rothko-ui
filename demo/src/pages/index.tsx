import Home from '../components/Home';
import WithProviders from '../components/WithProviders';

const HomePage = () => {
  return (
    <WithProviders themeMode="dark">
      <Home />
    </WithProviders>
  );
};

export default HomePage;
