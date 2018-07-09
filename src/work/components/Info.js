import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
          <h4>{this.context.t('Descripción')}</h4>
          {description}
        </div>
        <div className="Genres">
          <h4>{this.context.t('genres')}</h4>
          {work.works_genres.map(genre => <li key={genre}>{this.context.t(genre)}</li>)}
        </div>
        <div className="People">
          {work.people_works.map(peopleWork => (
            <div>
              <h4>{this.context.t(peopleWork.rolText)}</h4>
              <span>{peopleWork.people.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Info.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Info;
