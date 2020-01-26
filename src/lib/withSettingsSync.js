import { useEffect } from 'react';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = ({ token }) => {
  cookie.set('token', token, { expires: 1 });
};

export const auth = ctx => {
  const { rf_language } = nextCookie(ctx);

  return rf_language;
};

export const withSettingsSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        // ?
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
