import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  }

  render() {
    return (
      <FilterCardComp>
        <input
          type="text"
          name="q"
          className="form-control"
          placeholder={this.context.t("Buscar serie...")}
          id="q"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </FilterCardComp>
    );
  }
}

FilterCard.contextTypes = {
  t: PropTypes.func.isRequired
};

export default FilterCard;
