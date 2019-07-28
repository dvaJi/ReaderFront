import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

// App imports
import Routes from './Routes';
import Header from './layout/header';
import { useGlobalState } from './state';
import {
  primaryColor,
  bodyColor,
  bodyBackgroundColor,
  scrollBackground
} from './themes';

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

function App() {
  const [themeSelected] = useGlobalState('theme');
  return (
    <ThemeProvider theme={{ mode: themeSelected }}>
      <>
        <GlobalStyle />
        <div className="App">
          <Header />
          {Routes}
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
