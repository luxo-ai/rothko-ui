import type { Dictionary } from '@rothko-ui/utils';
import cookie from 'cookie';
import MobileDetect from 'mobile-detect';
import type { AppContext, AppProps } from 'next/app';
import { useEffect } from 'react';
import RothkoHeader from '../components/Header';
import { IsMobileOrTabletContext } from '../components/IsMobileOrTabletContext';
import WithProviders from '../components/WithProviders';
import config from '../config';
import '../../public/fonts/style.css';
import '../globals.css';

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
  useEffect(() => {
    const threeScript = document.createElement('script');
    threeScript.setAttribute('id', 'threeScript');
    threeScript.setAttribute(
      'src',
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js'
    );
    document.getElementsByTagName('head')[0].appendChild(threeScript);
    return () => {
      if (threeScript) {
        threeScript.remove();
      }
    };
  }, []);

  const mode = (cookies?.[config.preference.themeMode] || 'dark') as 'dark' | 'light';

  return (
    <>
      <RothkoHeader />
      <IsMobileOrTabletContext.Provider value={isMobileOrTablet}>
        <WithProviders theme={mode}>
          <Component {...pageProps} />
        </WithProviders>
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
