import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

// App Imports
import params from '../../params.json';
import MetaTag from './WorkMetaTag';
import Cover from '../components/Cover';
import Info from '../components/Info';
import ChapterList from '../components/ChapterList';
import WorkEmpty from '../components/WorkEmpty';
import { FETCH_WORK } from './query';

class WorkContainer extends Component {
  render() {
    const language = params.global.languages[this.props.language];
    return (
      <Query
        query={FETCH_WORK}
        variables={{
          language: language.id,
          stub: this.props.match.params.stub
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <WorkEmpty />;
          if (error) return <p id="error_releases">Error :(</p>;

          return (
            <>
              <MetaTag work={data.work} language={language} />
              <div className="row">
                <div className="col-md-4">
                  <Cover work={data.work} name={data.work.name} />
                </div>
                <Info
                  work={data.work}
                  description={data.work.works_descriptions.find(
                    e => e.language === language.id
                  )}
                />
                <ChapterList work={data.work} language={language} />
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    match: ownProps.match,
    language: state.layout.language
  };
};

export default connect(mapStateToProps)(WorkContainer);
