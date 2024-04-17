import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async _context => {
  return {
    redirect: {
      destination: '/overview',
      permanent: false,
    },
  };
};

const ComponentsPage = () => {
  return null;
};

export default ComponentsPage;
