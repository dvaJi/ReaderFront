import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { fetchWorks, worksFilterText } from '../actions/doWorks';
import * as config from '../../config';
import WorksList from '../components/WorksList';
import FilterCard from '../components/FilterCard';

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

  renderMetaTags() {
    const title = config.APP_TITLE;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <FormattedMessage
          id="works.title"
          defaultMessage="{title} - Projects list"
          values={{ title: title }}
        >
          {title => (
            <Helmet>
              <title>{title}</title>
              <meta property="og:title" content={title} />
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage
          id="works.desc"
          defaultMessage="All {title} Projects"
          values={{ title: title }}
        >
          {desc => (
            <Helmet>
              <meta name="description" content={desc} />
            </Helmet>
          )}
        </FormattedMessage>
      </div>
    );
  }

  render() {
    return (
      <div className="Works">
        {this.renderMetaTags()}
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
    getWorks: lang => dispatch(fetchWorks(lang, 'ASC', 120, 'name')),
    doFilterText: text => dispatch(worksFilterText(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorksContainer);
