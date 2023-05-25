import type { ThemeOverrides } from '@rothko-ui/ui';
import { RothkoProvider } from '@rothko-ui/ui';
import type { Dictionary } from '@rothko-ui/utils';
import cookie from 'cookie';
import MobileDetect from 'mobile-detect';
import type { AppContext, AppProps } from 'next/app';
import RothkoHeader from '../components/Header';
import { IsMobileOrTabletContext } from '../components/IsMobileOrTabletContext';
import PaddedNavLayout from '../components/layout/PaddedNavLayout';
import config from '../config';
import '../styles/globals.css';

const themeOverride: ThemeOverrides = {
  typography: {
    body: {
      regular: { value: `"Helvetica Neue", "Helvetica", Arial, sans-serif` },
      bold: { value: "'LabGrotesque-Bold'" },
      italic: { value: "'LabGrotesque-Italic'" },
      light: { value: "'LabGrotesque-Light'" },
    },
    header: { value: "'LabGrotesque-Regular'" },
  },
};

type RothkoAppProps = AppProps & {
  cookies?: Dictionary<string, string>;
  isMobileOrTablet?: boolean;
};
export default function App({
  Component,
  pageProps,
  cookies,
  isMobileOrTablet = false,
}: RothkoAppProps) {
  // const router = useRouter();
  // const [pageLoading, setPageLoading] = useState(false);

  // useEffect(() => {
  // const handleStart = () => setPageLoading(true);
  //  const handleComplete = () => setPageLoading(false);
  //  router.events.on('routeChangeStart', handleStart);
  //  router.events.on('routeChangeComplete', handleComplete);
  //  router.events.on('routeChangeError', handleComplete);
  // }, [router, setPageLoading]);

  const mode = (cookies?.[config.preference.themeMode] || 'dark') as 'dark' | 'light';

  return (
    <>
      <RothkoHeader />
      <IsMobileOrTabletContext.Provider value={isMobileOrTablet}>
        <RothkoProvider themeOverrides={themeOverride} themeMode={mode} debugMode>
          <PaddedNavLayout>
            <Component {...pageProps} />
          </PaddedNavLayout>
        </RothkoProvider>
      </IsMobileOrTabletContext.Provider>
    </>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  const cookieString = ctx.ctx.req?.headers.cookie || '';
  const cookies = cookie.parse(cookieString);
  const mobileDetect = new MobileDetect(ctx.ctx.req?.headers['user-agent'] || '');
  return {
    cookies,
    isMobileOrTablet: !!mobileDetect.mobile() || !!mobileDetect.tablet(),
  };
};
