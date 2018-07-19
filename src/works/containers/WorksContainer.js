import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { fetchWorks, worksFilterText } from "../actions/doWorks";
import * as config from "../../config";
import WorksList from "../components/WorksList";
import FilterCard from "../components/FilterCard";

class WorksContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.props.doFilterText(filterText);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      this.props.getWorks(nextProps.language);
    }
  }

  componentDidMount() {
    if (this.props.works.length === 0) {
      try {
        this.props.getWorks(this.props.language);
      } catch (e) {
        console.error(e);
      }
    }
  }

  render() {
    return (
      <div className="Works">
        <MetaTags>
          <title>{config.APP_TITLE + " - Lista de Works"}</title>
          <meta name="description" content="Lista de todas nuestras works." />
          <meta
            property="og:title"
            content={config.APP_TITLE + " - Lista de Works"}
          />
        </MetaTags>
        <FilterCard
          filter={this.props.searchText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <WorksList
          isLoading={this.props.isLoading}
          works={this.props.works}
          filterText={this.props.filterText}
          doSelectWork={this.props.doSelectWork}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    works: state.works.works,
    filterText: state.works.worksFilterText,
    isLoading: state.works.worksIsLoading,
    hasErrored: state.works.workHasErrored,
    language: state.layout.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWorks: lang => dispatch(fetchWorks(lang)),
    doFilterText: text => dispatch(worksFilterText(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorksContainer);
