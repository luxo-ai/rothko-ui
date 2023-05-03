import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { RothkoProvider } from '@rothko-ui/ui';
import PaddedNavLayout from '../components/Layout/PaddedNavLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RothkoProvider themeMode="dark" debugMode>
      <PaddedNavLayout>
        <Component {...pageProps} />
      </PaddedNavLayout>
    </RothkoProvider>
  );
}
