/* eslint-disable react/jsx-props-no-spreading */

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
import { ToasterContextProvider } from '@rothko-ui/components';
import PaddedNavLayout from '../components/layout/PaddedNavLayout';
import ThemeProvider from '../components/theme/ThemeProvider';

type RothkoAppProps = AppProps & {
  cookies?: Partial<Record<string, string>>;
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
        <ThemeProvider defaultTheme={theme}>
          <PaddedNavLayout selected={pageProps.router.pathname}>
            <ToasterContextProvider>
              <Component {...pageProps} />
            </ToasterContextProvider>
          </PaddedNavLayout>
        </ThemeProvider>
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
