import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ReactGA from "react-ga";
import * as config from "./config";
import Routes from "./Routes";
import RouteNavItem from "./common/RouteNavItem";
import faBook from "@fortawesome/fontawesome-free-solid/faBook";
import faThList from "@fortawesome/fontawesome-free-solid/faThList";
import "./App.css";

class App extends Component {
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
                <RouteNavItem href="/">
                  <FontAwesomeIcon icon={faThList} />
                  Releases
                </RouteNavItem>
                <RouteNavItem href="/series">
                  <FontAwesomeIcon icon={faBook} />Series
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

export default App;
