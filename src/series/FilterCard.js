import React, { Component } from "react";

export default class FilterCard extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <div className="search-card">
        <input
          type="text"
          name="q"
          className="form-control"
          placeholder="Buscar serie..."
          id="q"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </div>
    );
  }
}
