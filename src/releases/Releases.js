import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import ReleasesList from "./ReleasesList";
import * as config from "../config";
import "./Releases.css";

export default class Releases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isInitialLoading: true,
      isFetchingData: false,
      page: 1,
      releases: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.getReleases = this.getReleases.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  async componentDidMount() {
    try {
      window.addEventListener("scroll", this.handleOnScroll);
      this.setState({ isLoading: true, isFetchingData: true });

      const results = await this.getReleases();
      this.setState({ isFetchingData: false });

      results.map(
        rel =>
          (rel.style = {
            backgroundImage: "url(" + rel.chapter.thumbnail + ")"
          })
      );
      if (!this.state.isInitialLoading) {
        this.setState({
          releases: this.state.releases.concat(results),
          isLoading: false
        });
      } else {
        this.setState({ releases: results, isLoading: false, isInitialLoading: false });
      }
    } catch (e) {
      console.error(e);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  async handleOnScroll() {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    if (!this.state.isLoading) {
      var scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      var scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      var clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      var scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom && !this.state.isFetchingData) {
        this.setState({ isFetchingData: true });
        this.setState({ page: this.state.page + 1 });

        const results = await this.getReleases();
        results.map(
          rel =>
            (rel.style = {
              backgroundImage: "url(" + rel.chapter.thumbnail + ")"
            })
        );
        if (!this.state.isInitialLoading) {
          this.setState({
            releases: this.state.releases.concat(results),
            isLoading: false,
            isFetchingData: false
          });
        } else {
          this.setState({
            releases: results,
            isInitialLoading: false,
            isFetchingData: false
          });
        }
      }
    }
  }

  getReleases() {
    return fetch(
      config.READER_PATH +
        "v1/releases?orderby=desc_created&page=" +
        this.state.page
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(releases) {
        return releases;
      });
  }

  render() {
    return (
      <div className="Releases">
        <MetaTags>
          <title>{config.APP_TITLE + " - Capítulos Recientes"}</title>
          <meta name="description" content="Capítulos más recientes." />
          <meta
            property="og:title"
            content={config.APP_TITLE + " - Capítulos Recientes"}
          />
        </MetaTags>
        <ReleasesList
          loading={this.state.isLoading}
          isFetchingData={this.state.isFetchingData}
          releases={this.state.releases}
        />
      </div>
    );
  }
}
