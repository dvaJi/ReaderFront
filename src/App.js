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

  ::-webkit-scrollbar-thumb {
    background: ${scrollBackground};
    border-radius: 5px;
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
