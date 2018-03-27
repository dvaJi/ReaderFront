import React, { Component } from "react";
import Cookies from "js-cookie";
import MetaTags from "react-meta-tags";
import API from "../../services/api";
import * as config from "../../config";
import Cover from "../../components/Serie/Cover";
import Info from "../../components/Serie/Info";
import Chapter from "../../components/Serie/Chapter";
import SerieEmpty from "../../components/Serie/SerieEmpty";
import "./Serie.css";

export default class Serie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      serie: {
        chapters: []
      }
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
    try {
      const lang = Cookies.get("language") || "es";
      const results = await API.getSerie(lang, this.props.match.params.stub);
      this.setState({ serie: results, isLoading: false });
    } catch (e) {
      console.error(e);
    }
  }

  renderSerie() {
    return (
      <div className="Serie">
        <MetaTags>
          <title>{this.state.serie.name + " - " + config.APP_TITLE}</title>
          <meta
            name="description"
            content={
              "Todos los capítulos y más recientes de " + this.state.serie.name
            }
          />
          <meta
            property="og:title"
            content={this.state.serie.name + " - " + config.APP_TITLE}
          />
        </MetaTags>
        <h1>{this.state.serie.name}</h1>
        <div className="row">
          <div className="col-md-3">
            <Cover
              cover={this.state.serie.thumb2}
              name={this.state.serie.name}
            />
          </div>

          <div className="col-md-8 col-md-offset-1">
            <Info serie={this.state.serie} />
          </div>
          <div className="ChaptersList col-md-12">
            <h2>Capítulos</h2>
            <ul className="Chapters">
              {this.state.serie.chapters
                .sort((a, b) => b.chapter - a.chapter)
                .map(chapter => (
                  <Chapter
                    key={chapter.id}
                    serie={this.state.serie}
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
    if (!this.state.isLoading) {
      return this.renderSerie();
    } else {
      return <SerieEmpty />;
    }
  }
}
