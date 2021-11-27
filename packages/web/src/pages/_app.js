import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from 'react';
import nextCookie from 'next-cookies';
import { config } from '@fortawesome/fontawesome-svg-core';

import { APP_VERSION } from 'lib/config';
import { initGlobalState } from 'lib/state';
import { initGA, logPageView } from 'lib/analytics';
import setupIcons from 'lib/icons';
import Main from '../components/main';

import IntlProvider from "@components/IntlProvider";

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../components/ComicSlide/slide.css';
import './flags.css';

setupIcons();
config.autoAddCss = false;

function MyApp({
  Component,
  pageProps,
  locale,
  messages,
  language,
  languages_filter,
  theme,
  lngDict,
}) {
  const router = useRouter();
  useEffect(() => {
    initGA();
    logPageView();

    router.events.on("routeChangeComplete", logPageView);
    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);

  let preconnect = [];
  if (process.env.REACT_APP_CDNS === 'photon') {
    preconnect = [
      {
        rel: 'preconnect',
        href: '//i0.wp.com'
      },
      {
        rel: 'preconnect',
        href: '//i1.wp.com'
      },
      {
        rel: 'preconnect',
        href: '//i2.wp.com'
      }
    ];
  }

  const feeds = [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'RSS Chapter Feed',
      href: `${process.env.REACT_APP_READER_PATH}/feed/rss/${locale}`
    },
    {
      rel: 'alternate',
      type: 'application/atom+xml',
      title: 'Atom Chapter Feed',
      href: `${process.env.REACT_APP_READER_PATH}/feed/atom/${locale}`
    },
    {
      rel: 'sitemap',
      type: 'application/xml',
      title: 'Sitemap',
      href: `${process.env.REACT_APP_READER_PATH}/sitemap.xml`
    }
  ]

  initGlobalState({ language, theme, languages_filter });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{process.env.REACT_APP_APP_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="generator" content={`ReaderFront v${APP_VERSION}`} />
        <meta property="og:title" content={process.env.REACT_APP_APP_TITLE} />
        {preconnect.map(pre => <link key={pre.href} rel={pre.rel} href={pre.href} />)}
        {feeds.map(feed => <link key={feed.href} rel={feed.rel} type={feed.type} title={feed.title} href={feed.href} />)}
      </Head>
      <IntlProvider messages={lngDict} locale={locale}>
        <Main theme={theme}>
          <Component {...pageProps} />
        </Main>
      </IntlProvider>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  let pageProps = {};

  const {
    rf_language: language,
    rf_languages_filter: languages_filter,
    theme,
    token,
    user,
    acpUploadView,
    chaptersSeen
  } = nextCookie(ctx);

  const locale = ctx?.router?.locale ?? 'en';
  const messages = {};

  const lngDict = require(`@readerfront/shared/build/lang/${locale}.json`);

  return {
    lngDict,
    pageProps,
    locale,
    messages,
    language,
    languages_filter,
    theme: theme || 'dark',
    token,
    user,
    acpUploadView,
    chaptersSeen
  };
}

export default MyApp;
