import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { fetchWork } from '../actions/doWork';
import { withRouter } from 'react-router';
import { getWorkThumb } from '../../utils/common';
import * as config from '../../config';
import params from '../../params.json';
import Cover from '../components/Cover';
import Info from '../components/Info';
import Chapter from '../components/Chapter';
import WorkEmpty from '../components/WorkEmpty';

class WorkContainer extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getWork(this.props.language, this.props.params.stub);
    } catch (e) {
      console.error(e);
    }
  }

  renderMetaTags() {
    const title = config.APP_TITLE;
    const { work } = this.props;
    const workDir = work.stub + '_' + work.uniqid;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{work.name + ' - ' + title}</title>
          <meta property="og:title" content={work.name + ' - ' + title} />
          <meta
            property="og:image"
            content={getWorkThumb(workDir, this.props.work.thumbnail, 'medium')}
          />
        </Helmet>
        <FormattedMessage
          id="work.desc"
          defaultMessage="All the latest and most recent chapters of {workName}"
          values={{ workName: work.name }}
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

  renderWork() {
    const work = this.props.work;
    const dir = work.stub + '_' + work.uniqid;
    const language = params.global.languages[this.props.language];
    return (
      <div className="Work">
        {this.renderMetaTags()}
        <h1>{work.name}</h1>
        <div className="row">
          <div className="col-md-3">
            <Cover
              cover={getWorkThumb(dir, work.thumbnail, 'medium')}
              name={work.name}
            />
          </div>
          <Info
            work={work}
            description={work.works_descriptions.find(
              e => e.language === language.id
            )}
          />
          <div className="ChaptersList col-md-12">
            <h2>
              <FormattedMessage id="chapters_list" defaultMessage="Chapters" />
            </h2>
            <ul className="Chapters">
              {work.chapters
                .filter(c => c.language === language.id)
                .sort((a, b) => b.chapter - a.chapter)
                .map(chapter => (
                  <Chapter
                    key={chapter.id}
                    work={work}
                    chapter={chapter}
                    language={language}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.isLoading && this.props.work) {
      return this.renderWork();
    } else {
      return <WorkEmpty />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    work: state.work.work,
    params: ownProps.match.params,
    isLoading: state.work.workIsLoading,
    hasErrored: state.work.workHasErrored,
    language: state.layout.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWork: (lang, stub) => dispatch(fetchWork(stub, lang))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkContainer)
);
