// import ThemeCard from '../components/cards/theming';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/overview',
      permanent: false,
    },
  };
};

const Theming = () => {
  return null;
};

export default Theming;
