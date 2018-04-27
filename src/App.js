import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./store";
import ReactGA from "react-ga";
import * as config from "./config";
import Routes from "./Routes";
import Header from "./layout/header";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    ReactGA.initialize(config.GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Header />
            {Routes}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
