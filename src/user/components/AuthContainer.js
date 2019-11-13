import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { APP_TITLE } from 'config';

const Root = styled.div`
  background-color: #0747a6;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const Layout = styled.div`
  flex: 1 1 auto;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 500px;
  margin: 0 auto;
  width: 400px;

  &:before {
    content: '';
    flex-shrink: 0;
    height: 48px;
  }
`;

const Header = styled.header`
  color: #deebff;
  text-align: center;
  display: block;
`;

const Main = styled.section`
  color: #deebff;
  text-align: center;
  display: block;
`;

const Card = styled.section`
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  color: #172b4d;
  padding: 48px;
`;

const Footer = styled.footer`
  color: #deebff;
  margin: auto 0 0;
  padding-bottom: 32px;
  text-align: center;
  display: block;

  a {
    color: #deebff;
  }

  a:hover {
    color: #ffffff;
  }

  .primary-action {
    color: #ffffff;
  }

  .fine-print {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    font-size: 12px;
  }
`;

function AuthContainer() {
  const { formatMessage: f } = useIntl();
  return (
    <Root>
      <Box>
        <Layout>
          <Container>
            <Header>
              <h1>{APP_TITLE}</h1>
            </Header>
            <Main>
              <Card>{this.props.children}</Card>
            </Main>
            {this.props.route.pathname !== '/signup' && (
              <Footer>
                <div>
                  <Link
                    id="signup"
                    className="primary-action"
                    to="/auth/signup"
                  >
                    <span>
                      {f({
                        id: 'auth.signup_message',
                        defaultMessage: 'Sign up for an account'
                      })}
                    </span>
                  </Link>
                </div>
              </Footer>
            )}
          </Container>
        </Layout>
      </Box>
    </Root>
  );
}

export default AuthContainer;
