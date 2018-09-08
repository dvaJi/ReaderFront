import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Root = styled.div`
  background-color: #0747a6;
  color: #ffffff;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  min-height: 100%;
  width: 100%;
`;

const Box = styled.div`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  -webkit-flex: 1 1 auto;
`;

const Layout = styled.div`
  flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  -webkit-flex: 1 1 auto;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  height: 100vh;
  min-height: 500px;
  margin: 0 auto;
  width: 400px;

  &:before {
    content: '';
    flex-shrink: 0;
    -ms-flex-negative: 0;
    -webkit-flex-shrink: 0;
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
  -moz-box-sizing: border-box;
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
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    list-style: none;
    padding: 0;
    font-size: 12px;
  }
`;

class AuthContainer extends Component {
  render() {
    return (
      <Root>
        <Box>
          <Layout>
            <Container>
              <Header>
                <h1>Reader Front</h1>
              </Header>
              <Main>
                <Card>{this.props.children}</Card>
              </Main>
              {this.props.route.pathname !== '/signup' && (
                <Footer>
                  <div>
                    <Link id="signup" className="primary-action" to="/signup">
                      <span>
                        <FormattedMessage
                          id="auth.signup_message"
                          defaultMessage="Sign up for an account"
                        />
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
}

export default AuthContainer;
