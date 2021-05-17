/* eslint-disable no-console */
import ReactGA from 'react-ga';

export const initGA = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('GA init');
  }

  if (process.env.REACT_APP_GA_ID) {
    ReactGA.initialize(process.env.REACT_APP_GA_ID, {
      debug: process.env.NODE_ENV === 'development'
    });
  }
};

export const logPageView = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Logging pageview for ${window.location.pathname}`);
  }

  if (process.env.REACT_APP_GA_ID) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const logEvent = (category = '', action = '', label = '', value = 1) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Logging event:`, { category, action, label, value });
  }

  if (process.env.REACT_APP_GA_ID && category && action) {
    ReactGA.event({ category, action, label, value });
  }
};

export const logException = (description = '', fatal = false) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Logging exception description: ${description} | fatal: ${fatal}`
    );
  }

  if (process.env.REACT_APP_GA_ID && description) {
    ReactGA.exception({ description, fatal });
  }
};
