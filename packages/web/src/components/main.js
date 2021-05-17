import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from '@components/layout/header';
import { READER_PATH, APP_VERSION, CDN } from 'lib/config';
import { useGlobalState } from 'lib/state';

import { theme as rfTheme } from '@readerfront/ui';
const { primaryColor, bodyColor, bodyBackgroundColor, scrollBackground } =
  rfTheme;

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

  .container {
    margin-top: 30px;
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

function App({ children, theme }) {
  const [themeSelected] = useGlobalState('theme');
  const [language] = useGlobalState('language');
  return (
    <>
      <Helmet defer={false}>
        <meta name="generator" content={`ReaderFront v${APP_VERSION}`} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Chapter Feed"
          href={`${READER_PATH}/feed/rss/${language}`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom Chapter Feed"
          href={`${READER_PATH}/feed/atom/${language}`}
        />
        {CDN === 'photon' && <link rel="preconnect" href="//i0.wp.com" />}
        {CDN === 'photon' && <link rel="preconnect" href="//i1.wp.com" />}
        {CDN === 'photon' && <link rel="preconnect" href="//i2.wp.com" />}
      </Helmet>
      <ThemeProvider theme={{ mode: themeSelected || theme }}>
        <GlobalStyle />
        <div className="App">
          <Header theme={themeSelected || theme} />
          {children}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
