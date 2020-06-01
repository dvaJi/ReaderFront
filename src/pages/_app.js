import App from 'next/app';
import React from 'react';
import { Helmet } from 'react-helmet';
import nextCookie from 'next-cookies';
import { createIntlCache } from 'react-intl';
import { config } from '@fortawesome/fontawesome-svg-core';

import setupIcons from '../lib/icons';
import Main from '../components/main';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../components/ComicSlide/slide.css';
import './flags.css';

import ConnectedIntl from '../lib/connectedIntl';
import { APP_VERSION } from 'lib/config';
import { initGlobalState } from 'lib/state';

setupIcons();
config.autoAddCss = false;

const cache = createIntlCache();

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const {
      rf_language: language,
      rf_languages_filter: languages_filter,
      theme,
      token,
      user,
      acpUploadView,
      chaptersSeen
    } = nextCookie(ctx);

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props;

    return {
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

  render() {
    const {
      Component,
      pageProps,
      locale,
      messages,
      language,
      languages_filter,
      theme
    } = this.props;

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

    initGlobalState({ language, theme, languages_filter });

    return (
      <>
        <Helmet
          htmlAttributes={{ lang: locale }}
          title={process.env.REACT_APP_APP_TITLE}
          meta={[
            ...preconnect,
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1'
            },
            {
              name: 'generator',
              content: `ReaderFront v${APP_VERSION}`
            },
            { property: 'og:title', content: process.env.REACT_APP_APP_TITLE }
          ]}
          link={[
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
          ]}
        />
        <ConnectedIntl
          locale={language || locale || 'en'}
          messages={messages}
          cache={cache}
        >
          <Main theme={theme}>
            <Component {...pageProps} />
          </Main>
        </ConnectedIntl>
      </>
    );
  }
}
