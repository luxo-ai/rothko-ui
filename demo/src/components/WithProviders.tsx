import { RothkoProvider } from '@rothko-ui/ui';
import { useRouter } from 'next/router';

type WithProvidersProps = {
  children: React.ReactNode;
  theme?: 'dark' | 'light';
};

const WithProviders = ({ children, theme = 'dark' }: WithProvidersProps) => {
  const router = useRouter();
  return (
    <RothkoProvider theme={router.pathname === '/' ? 'dark' : theme}>{children}</RothkoProvider>
  );
};

export default WithProviders;
