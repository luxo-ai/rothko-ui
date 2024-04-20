import type { GetServerSideProps } from 'next';
import Home from '../components/Home';
import WithProviders from '../components/WithProviders';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/overview',
      permanent: false,
    },
  };
};

const HomePage = () => {
  return (
    <WithProviders theme="dark">
      <Home />
    </WithProviders>
  );
};

export default HomePage;
