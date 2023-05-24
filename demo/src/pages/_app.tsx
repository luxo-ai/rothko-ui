import type { ThemeOverrides } from '@rothko-ui/ui';
import { RothkoProvider } from '@rothko-ui/ui';
import type { Dictionary } from '@rothko-ui/utils';
import cookie from 'cookie';
import type { AppContext, AppProps } from 'next/app';
import React from 'react';
import PaddedNavLayout from '../components/Layout/PaddedNavLayout';
import { ROTHKO_MODE_COOKIE_NAME } from '../constants';
import '../styles/globals.css';

const themeOverride: ThemeOverrides = {
  typography: {
    body: {
      regular: { value: "'LabGrotesque-Regular'" },
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
  const mode = (cookies?.[ROTHKO_MODE_COOKIE_NAME] || 'dark') as 'dark' | 'light';
  return (
    <RothkoProvider themeOverrides={themeOverride} themeMode={mode} debugMode>
      <PaddedNavLayout>
        <Component {...pageProps} />
      </PaddedNavLayout>
    </RothkoProvider>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  const cookieString = ctx.ctx.req?.headers.cookie || '';
  const cookies = cookie.parse(cookieString);
  return { cookies };
};
