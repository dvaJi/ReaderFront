import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { forceCheck } from 'react-lazyload';

const FilterCardComp = styled.div`
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 65px;
  width: 100%;
  margin-right: 3%;
  max-height: 210px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
`;

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
      <FilterCardComp>
        <input
          type="text"
          name="q"
          className="form-control"
          placeholder={this.props.intl.formatMessage({
            id: 'search_work',
            defaultMessage: 'Search...'
          })}
          id="q"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </FilterCardComp>
    );
  }
}

export default injectIntl(FilterCard);
