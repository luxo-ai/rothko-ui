import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/overview',
      permanent: false,
    },
  };
};

const HomePage = () => {
  return null;
};

export default HomePage;
