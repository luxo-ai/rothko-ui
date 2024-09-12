import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import cookie from 'cookie';
import config from '../config';

type CookiesProps = {
  cookies: Record<string, string>;
};

class MyDocument extends Document<CookiesProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const cookieString = ctx.req?.headers.cookie || '';
    const cookies = cookie.parse(cookieString);
    return { ...initialProps, cookies };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="manifest" href="/manifest.json" />
          {/* ---- LAB GROTESQUE ---- */}
          <link
            rel="preload"
            href="/fonts/LabGrotesque/LabGrotesque-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/LabGrotesque/LabGrotesque-Italic.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/LabGrotesque/LabGrotesque-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/LabGrotesque/LabGrotesque-Light.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Soehne/soehne-buch.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Soehne/soehne-halbfett.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Soehne/soehne-mono-buch.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
        </Head>
        <body className={'dark'}>
          {/*this.props.cookies[config.preference.theme] || 'dark'}>*/}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
