import React, { Component } from "react";
import styled from "styled-components";

export default class FilterCard extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    const FilterCard = styled.div`
      background-color: #fff;
      border-radius: 2px;
      margin-bottom: 65px;
      width: 100%;
      margin-right: 3%;
      max-height: 210px;
      box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
    `;
    return (
      <FilterCard>
        <input
          type="text"
          name="q"
          className="form-control"
          placeholder="Buscar serie..."
          id="q"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </FilterCard>
    );
  }
}
