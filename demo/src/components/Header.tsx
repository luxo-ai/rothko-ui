import Header from 'next/head';
import React from 'react';
import config from '../config';

type HeaderProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const RothkoHeader = ({
  children,
  title = 'Rothko UI',
  description = 'Modern React UI Library.',
}: HeaderProps) => (
  <Header>
    <title key="title">{title}</title>
    <meta name="description" content={description} key="description" />
    <meta name="theme-color" content="#000000" key="theme-color" />
    {/* apple status bar color */}
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    {/**
     * Open graph stuff
     * @link https://ogp.me/
     */}
    <meta name="og:title" content={title} key="og:title" />
    <meta name="og:description" content={description} key="og:description" />
    <meta name="og:site_name" content="rothko-ui" key="og:site_name" />
    <meta name="og:image" content={`${config.baseUrl}/public/logo192.png`} key="og:image" />
    {children}
  </Header>
);

export default RothkoHeader;
