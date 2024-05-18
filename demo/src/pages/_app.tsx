import type { Dictionary } from '@rothko-ui/utils';
import cookie from 'cookie';
import MobileDetect from 'mobile-detect';
import type { AppContext, AppProps } from 'next/app';
import '../../public/fonts/style.css';
import RothkoHeader from '../components/Header';
import { IsMobileOrTabletContext } from '../components/IsMobileOrTabletContext';
import config from '../config';
import '../globals.css';
import ErrorBoundary from '../components/ErrorBoundary';
import React from 'react';
import { RothkoProvider, ToastContextProvider } from '@rothko-ui/ui';
import PaddedNavLayout from '../components/layout/PaddedNavLayout';

type RothkoAppProps = AppProps & {
  cookies?: Dictionary<string, string>;
  isMobileOrTablet?: boolean;
};
export default function App({
  Component,
  cookies,
  isMobileOrTablet = false,
  ...pageProps
}: RothkoAppProps) {
  const theme = (cookies?.[config.preference.theme] || 'dark') as 'dark' | 'light';
  return (
    <ErrorBoundary>
      <RothkoHeader />
      <IsMobileOrTabletContext.Provider value={isMobileOrTablet}>
        <RothkoProvider debugMode={config.debug} theme={theme}>
          <PaddedNavLayout selected={pageProps.router.pathname}>
            <ToastContextProvider>
              <Component {...pageProps} />
            </ToastContextProvider>
          </PaddedNavLayout>
        </RothkoProvider>
      </IsMobileOrTabletContext.Provider>
    </ErrorBoundary>
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
