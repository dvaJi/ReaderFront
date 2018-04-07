import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ReactGA from "react-ga";
import * as config from "./config";
import Routes from "./Routes";
import RouteNavItem from "./components/Common/RouteNavItem";
import LangNavItem from "./components/Common/LangNavItem";
import faBook from "@fortawesome/fontawesome-free-solid/faBook";
import faThList from "@fortawesome/fontawesome-free-solid/faThList";
import faRss from "@fortawesome/fontawesome-free-solid/faRss";
import faDiscord from "@fortawesome/fontawesome-free-brands/faDiscord";
import faPatreon from "@fortawesome/fontawesome-free-brands/faPatreon";
import "./App.css";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.toggleNavbar = this.toggleNavbar.bind(this);
    if (cookies.get("language") === undefined) {
      cookies.set("language", "es", { path: "/" });
    }
    this.state = {
      language: cookies.get("language") || "es",
      isOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
          <Navbar color="white" fixed="true" light expand="md">
            <NavbarBrand to="/">{config.APP_TITLE}</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <LangNavItem
                  cookielang={this.state.language}
                  language="es"
                  onClick={e => this.changeLanguage("es")}
                >
                  ES
                </LangNavItem>
                <LangNavItem
                  cookielang={this.state.language}
                  language="en"
                  onClick={e => this.changeLanguage("en")}
                >
                  EN
                </LangNavItem>
                <RouteNavItem href="/">
                  <FontAwesomeIcon icon={faThList} />
                  Releases
                </RouteNavItem>
                <RouteNavItem href="/series">
                  <FontAwesomeIcon icon={faBook} />Series
                </RouteNavItem>
                <RouteNavItem href="/blog">
                  <FontAwesomeIcon icon={faRss} />Blog
                </RouteNavItem>
                <RouteNavItem href={config.DISCORD_URL} target="_blank">
                  <FontAwesomeIcon icon={faDiscord} />Discord
                </RouteNavItem>
                <RouteNavItem href={config.PATREON_URL} target="_blank">
                  <FontAwesomeIcon icon={faPatreon} />Patreon
                </RouteNavItem>
              </Nav>
            </Collapse>
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
