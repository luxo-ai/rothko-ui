import { RothkoProvider } from '@rothko-ui/ui';
import { useRouter } from 'next/router';
import config from '../config';

type WithProvidersProps = {
  children: React.ReactNode;
  theme?: 'dark' | 'light';
};

const WithProviders = ({ children, theme = 'dark' }: WithProvidersProps) => {
  const router = useRouter();
  return (
    <RothkoProvider debugMode={config.debug} theme={router.pathname === '/' ? 'dark' : theme}>
      {children}
    </RothkoProvider>
  );
};

export default WithProviders;
