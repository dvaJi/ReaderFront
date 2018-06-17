import React, { Component } from "react";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { fetchSerie } from "../actions/doSerie";
import { withRouter } from "react-router";
import * as config from "../../config";
import Cover from "../components/Cover";
import Info from "../components/Info";
import Chapter from "../components/Chapter";
import SerieEmpty from "../components/SerieEmpty";

class SerieContainer extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getSerie(this.props.params.stub);
    } catch (e) {
      console.error(e);
    }
  }

  renderMetaTags() {
    return (
      <MetaTags>
        <title>{this.props.serie.name + " - " + config.APP_TITLE}</title>
        <meta
          name="description"
          content={
            "Todos los capítulos y más recientes de " + this.props.serie.name
          }
        />
        <meta
          property="og:title"
          content={this.props.serie.name + " - " + config.APP_TITLE}
        />
      </MetaTags>
    );
  }

  renderSerie() {
    return (
      <div className="Serie">
        {this.renderMetaTags()}
        <h1>{this.props.serie.name}</h1>
        <div className="row">
          <div className="col-md-3">
            <Cover
              cover={
                this.props.serie.thumb2
                  ? this.props.serie.thumb2
                  : "/static/images/default-cover.png"
              }
              name={this.props.serie.name}
            />
          </div>
          <Info
            serie={this.props.serie}
            description={this.props.serie.descriptions.find(
              e => e.language === this.props.language
            )}
          />
          <div className="ChaptersList col-md-12">
            <h2>{this.context.t("Lista de capítulos")}</h2>
            <ul className="Chapters">
              {this.props.serie.chapters
                .filter(c => c.language === this.props.language)
                .sort((a, b) => b.chapter - a.chapter)
                .map(chapter => (
                  <Chapter
                    key={chapter.id}
                    serie={this.props.serie}
                    chapter={chapter}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.isLoading && this.props.serie) {
      return this.renderSerie();
    } else {
      return <SerieEmpty />;
    }
  }
}

SerieContainer.contextTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    serie: state.serie.serie,
    params: ownProps.match.params,
    isLoading: state.serie.serieIsLoading,
    hasErrored: state.serie.serieHasErrored,
    language: state.layout.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSerie: stub => dispatch(fetchSerie(stub))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SerieContainer)
);
