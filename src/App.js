import React from 'react';
import { Helmet } from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

// App imports
import { READER_PATH, APP_VERSION, CDN } from 'config';
import setupIcons from './setupIcons';
import Routes from './Routes';
import Header from './layout/header';
import { useGlobalState } from './state';
import {
  primaryColor,
  bodyColor,
  bodyBackgroundColor,
  scrollBackground
} from './themes';
import translations from 'i18n/locales';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${bodyBackgroundColor} !important;
    color: ${bodyColor} !important;
  }

  a {
    color: ${primaryColor} !important;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${scrollBackground};
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: ${primaryColor};
    }
  }

  .show-loading-animation {
    animation: react-placeholder-pulse 1.5s infinite;
  }
  
  @keyframes react-placeholder-pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

setupIcons();

function App() {
  const [themeSelected] = useGlobalState('theme');
  const [language] = useGlobalState('language');
  return (
    <IntlProvider locale={language} messages={translations[language]}>
      <ThemeProvider theme={{ mode: themeSelected }}>
        <>
          <GlobalStyle />
          <Helmet defer={false}>
            <meta name="generator" content={`ReaderFront v${APP_VERSION}`} />
            <link
              rel="alternate"
              type="application/rss+xml"
              title="RSS Chapter Feed"
              href={`${READER_PATH}feed/rss/${language}`}
            />
            <link
              rel="alternate"
              type="application/atom+xml"
              title="Atom Chapter Feed"
              href={`${READER_PATH}feed/atom/${language}`}
            />
            {CDN === 'photon' && <link rel="preconnect" href="//i0.wp.com" />}
            {CDN === 'photon' && <link rel="preconnect" href="//i1.wp.com" />}
            {CDN === 'photon' && <link rel="preconnect" href="//i2.wp.com" />}
          </Helmet>
          <div className="App">
            <Header />
            {Routes}
          </div>
        </>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
