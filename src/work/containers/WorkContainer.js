import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const workDir = this.props.work.stub + '_' + this.props.work.uniqid;
    return (
      <Helmet>
        <title>{this.props.work.name + ' - ' + config.APP_TITLE}</title>
        <meta
          name="description"
          content={
            'Todos los capítulos y más recientes de ' + this.props.work.name
          }
        />
        <meta
          property="og:title"
          content={this.props.work.name + ' - ' + config.APP_TITLE}
        />
        <meta property="og:description" content={this.props.work.description} />
        <meta
          property="og:image"
          content={getWorkThumb(workDir, this.props.work.covers)}
        />
      </Helmet>
    );
  }

  renderWork() {
    const dir = this.props.work.stub + '_' + this.props.work.uniqid;
    const coversTypes = params.works.cover_type;
    const language = params.global.languages[this.props.language];
    return (
      <div className="Work">
        {this.renderMetaTags()}
        <h1>{this.props.work.name}</h1>
        <div className="row">
          <div className="col-md-3">
            <Cover
              cover={
                this.props.work.works_covers.length > 0
                  ? `/works/${dir}/${
                      this.props.work.works_covers.find(
                        c => c.coverTypeId === coversTypes.medium_thumb.id
                      ).filename
                    }`
                  : '/static/images/default-cover.png'
              }
              name={this.props.work.name}
            />
          </div>
          <Info
            work={this.props.work}
            description={this.props.work.works_descriptions.find(
              e => e.language === language.id
            )}
          />
          <div className="ChaptersList col-md-12">
            <h2>{this.context.t('Lista de capítulos')}</h2>
            <ul className="Chapters">
              {this.props.work.chapters
                .filter(c => c.language === language.id)
                .sort((a, b) => b.chapter - a.chapter)
                .map(chapter => (
                  <Chapter
                    key={chapter.id}
                    work={this.props.work}
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

WorkContainer.contextTypes = {
  t: PropTypes.func.isRequired
};

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
