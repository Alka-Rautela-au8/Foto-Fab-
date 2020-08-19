import React, { Component } from "react";

export class SearchForm extends Component {
  render() {
    const { onSubmit, onChange } = this.props;
    return (
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search free high-resolution photos"
          onChange={onChange}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    );
  }
}

export default SearchForm;
