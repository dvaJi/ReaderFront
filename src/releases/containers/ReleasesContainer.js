import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// App imports
import { fetchReleases, releasesPage } from '../actions/doReleases';
import MetaTag from './ReleaseMetaTags';
import ReleasePagination from '../components/ReleasePagination';
import ReleasesList from '../components/ReleasesList';
import params from '../../params.json';

const LatestReleases = ({ language, orderBy, first, offset }) => (
  <Query
    query={gql`
      {
        chapters(language: ${language}, orderBy: "${orderBy}", first: ${first}, offset: ${offset}, showHidden: false) {
          id
          chapter
          subchapter
          volume
          language
          name
          stub
          uniqid
          thumbnail
          releaseDate
          description
          createdAt
          work {id, stub, name, uniqid, adult}
          pages {id, filename, height, width}
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <ReleasesList releases={data.chapters} />;
    }}
  </Query>
);

class ReleasesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.setState({ page });
  }

  render() {
    const { language } = this.props;
    const { page } = this.state;
    return (
      <div className="Releases">
        <h2>
          <FormattedMessage id="latest" defaultMessage="Latest" />
        </h2>
        <MetaTag />
        <LatestReleases
          language={params.global.languages[language].id}
          orderBy={'DESC'}
          first={20}
          offset={page}
        />
        <ReleasePagination page={page} onPageChange={this.handlePageChange} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.layout.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadChapters: (lang, page) => dispatch(fetchReleases(lang, page)),
    changePage: page => dispatch(releasesPage(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleasesContainer);
