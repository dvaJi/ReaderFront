import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

export const InfoStyle = styled.div`
  width: 100%;
  text-align: left;
  background-color: #fff;
  border-radius: 2px;
  padding: 15px 20px;
  display: inline-block;
  position: relative;
  vertical-align: top;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(10px);
  white-space: normal;
  transition-property: all;
  transition-duration: 250ms;
`;

class Info extends PureComponent {
  render() {
    const { work } = this.props;
    const description =
      this.props.description !== undefined
        ? this.props.description.description
        : '';
    return (
      <InfoStyle className="col-md-8 col-md-offset-1">
        <div className="Description">
          <h4>
            <FormattedMessage id="description" defaultMessage="Description" />
          </h4>
          {description}
        </div>
        <div className="Genres">
          <h4>
            <FormattedMessage id="genres" defaultMessage="Genres" />
          </h4>
          {work.genres.map(genre => (
            <li key={genre}>
              <FormattedMessage id={'genre.' + genre} defaultMessage={genre} />
            </li>
          ))}
        </div>
        <div className="People">
          {work.people_works.map(peopleWork => (
            <div key={peopleWork.rol + peopleWork.people.id}>
              <h4>
                <FormattedMessage
                  id={'people.rol.' + peopleWork.rolText}
                  defaultMessage={peopleWork.rolText}
                />
              </h4>
              <span>{peopleWork.people.name}</span>
            </div>
          ))}
        </div>
      </InfoStyle>
    );
  }
}

export default Info;
