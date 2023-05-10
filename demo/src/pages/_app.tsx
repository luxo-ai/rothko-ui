import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import type { ThemeOverrides } from '@rothko-ui/ui';
import { RothkoProvider } from '@rothko-ui/ui';
import PaddedNavLayout from '../components/Layout/PaddedNavLayout';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RothkoProvider themeOverrides={themeOverride} themeMode="dark" debugMode>
      <PaddedNavLayout>
        <Component {...pageProps} />
      </PaddedNavLayout>
    </RothkoProvider>
  );
}
