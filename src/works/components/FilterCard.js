import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { forceCheck } from 'react-lazyload';

import { Input } from '../../common/ui';

class FilterCard extends PureComponent {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
    forceCheck();
  }

  render() {
    return (
      <div style={{ marginBottom: 35 }}>
        <Input
          type="text"
          name="work-search"
          placeholder={this.props.intl.formatMessage({
            id: 'search_work',
            defaultMessage: 'Search...'
          })}
          id="work-search"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </div>
    );
  }
}

export default injectIntl(FilterCard);
