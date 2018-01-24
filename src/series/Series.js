import React, { Component } from "react";
import Cookies from "js-cookie";
import MetaTags from "react-meta-tags";
import API from "../services/api";
import * as config from "../config";
import SerieList from "./SerieList";
import FilterCard from "./FilterCard";
import "./Series.css";

export default class Series extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      filterText: "",
      language: "es",
      series: [{
        id: 1,
        name: ""
      }]
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  async componentDidMount() {
    const series = [];
    for (let index = 0; index < 6; index++) {
      series.push({ id: index });
    }

    this.setState({ series: series });

    try {
      const lang = Cookies.get("language") || "es";
      const results = await API.getSeries(lang);
      this.setState({ series: results, isLoading: false });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="Series">
        <MetaTags>
          <title>{config.APP_TITLE + " - Lista de Series"}</title>
          <meta name="description" content="Lista de todas nuestras series." />
          <meta
            property="og:title"
            content={config.APP_TITLE + " - Lista de Series"}
          />
        </MetaTags>
        <FilterCard
          filter={this.state.searchText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <SerieList
          loading={this.state.isLoading}
          series={this.state.series}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}
