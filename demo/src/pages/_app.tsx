import type { ThemeOverrides } from '@rothko-ui/ui';
import { RothkoProvider } from '@rothko-ui/ui';
import type { Dictionary } from '@rothko-ui/utils';
import cookie from 'cookie';
import type { AppContext, AppProps } from 'next/app';
import React from 'react';
import PaddedNavLayout from '../components/lLayout/PaddedNavLayout';
import config from '../config';
import '../styles/globals.css';
import RothkoHeader from '../components/Header';
import MobileDetect from 'mobile-detect';

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

export default function App({
  Component,
  pageProps,
  cookies,
}: AppProps & { cookies?: Dictionary<string, string> }) {
  const mode = (cookies?.[config.preference.themeMode] || 'dark') as 'dark' | 'light';
  return (
    <>
      <RothkoHeader />
      <RothkoProvider themeOverrides={themeOverride} themeMode={mode} debugMode>
        <PaddedNavLayout>
          <Component {...pageProps} />
        </PaddedNavLayout>
      </RothkoProvider>
    </>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  const cookieString = ctx.ctx.req?.headers.cookie || '';
  const cookies = cookie.parse(cookieString);
  return { cookies };
};
