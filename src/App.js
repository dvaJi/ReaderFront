import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ReactGA from "react-ga";
import * as config from "./config";
import Routes from "./Routes";
import RouteNavItem from "./common/RouteNavItem";
import faBook from "@fortawesome/fontawesome-free-solid/faBook";
import faThList from "@fortawesome/fontawesome-free-solid/faThList";
import rss from "@fortawesome/fontawesome-free-solid/faRss";
import discord from "@fortawesome/fontawesome-free-brands/faDiscord";
import "./App.css";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      language: cookies.get("language") || "es"
    };
  }

  changeLanguage(lang) {
    const { cookies } = this.props;
    cookies.set("language", lang, { path: "/" });
    this.setState({ language: lang });
  }

  render() {
    ReactGA.initialize(config.GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
      <Router basename={config.APP_PATH}>
        <div className="App">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Ravens Scans</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <RouteNavItem
                  href="#ES"
                  onClick={e => this.changeLanguage("es")}
                >
                  ES
                </RouteNavItem>
                <RouteNavItem
                  href="#EN"
                  onClick={e => this.changeLanguage("en")}
                >
                  EN
                </RouteNavItem>
                <RouteNavItem href="/">
                  <FontAwesomeIcon icon={faThList} />
                  Releases
                </RouteNavItem>
                <RouteNavItem href="/series">
                  <FontAwesomeIcon icon={faBook} />Series
                </RouteNavItem>
                <RouteNavItem href="/blog">
                  <FontAwesomeIcon icon={rss} />Blog
                </RouteNavItem>
                <RouteNavItem href="https://discord.gg/2mARvkx">
                <FontAwesomeIcon icon={discord} />Discord
                </RouteNavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
