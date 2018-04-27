import React, { PureComponent } from "react";

export default class SerieEmpty extends PureComponent {
  render() {
    return (
      <div className="SerieEmpty shimme-serie row">
        <div className="col-md-3">
          <div className="shimme-cover show-loading-animation">{"\u00A0"}</div>
        </div>

        <div className="col-md-8 col-md-offset-1">
          <div className="Info">
            <div className="Description">
              <h4>
                <div className="shimme-text-title show-loading-animation">
                  {"\u00A0"}
                </div>
              </h4>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </div>
            <div className="Author">
              <h4>
                <div className="shimme-text-title show-loading-animation">
                  {"\u00A0"}
                </div>
              </h4>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
              <h4>
                <div className="shimme-text-title show-loading-animation">
                  {"\u00A0"}
                </div>
              </h4>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </div>
          </div>
        </div>
        <div className="ChaptersList col-md-12">
          <h2>
            <div className="shimme-text-title show-loading-animation">
              {"\u00A0"}
            </div>
          </h2>
          <ul className="Chapters">
            <li>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </li>
            <li>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </li>
            <li>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </li>
            <li>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </li>
            <li>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </li>
            <li>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </li>
            <li>
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
