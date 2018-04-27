import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { fetchSeries, seriesFilterText } from "../actions/doSeries";
import * as config from "../../config";
import SerieList from "../components/SerieList";
import FilterCard from "../components/FilterCard";

class SeriesContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.props.doFilterText(filterText);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      this.props.getSeries(nextProps.language);
    }
  }

  componentDidMount() {
    if (this.props.series.length === 0) {
      try {
        this.props.getSeries(this.props.language);
      } catch (e) {
        console.error(e);
      }
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
          filter={this.props.searchText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <SerieList
          loading={this.props.isLoading}
          series={this.props.series}
          filterText={this.props.filterText}
          doSelectSerie={this.props.doSelectSerie}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    series: state.series.series,
    filterText: state.series.seriesFilterText,
    isLoading: state.series.seriesIsLoading,
    hasErrored: state.series.serieHasErrored,
    language: state.layout.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSeries: lang => dispatch(fetchSeries(lang)),
    doFilterText: text => dispatch(seriesFilterText(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesContainer);
