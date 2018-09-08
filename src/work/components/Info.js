import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

class Info extends PureComponent {
  render() {
    const { work } = this.props;
    const description =
      this.props.description !== undefined
        ? this.props.description.description
        : '';
    return (
      <div className="Info col-md-8 col-md-offset-1">
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
      </div>
    );
  }
}

export default Info;
