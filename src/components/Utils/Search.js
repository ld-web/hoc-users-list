import React, { Component } from 'react';

class Search extends Component {
  render = () => {
    const { handleChange, searchTerm } = this.props;

    return (
      <div className="row">
        <div className="col">
          <input
            type="text"
            onChange={handleChange}
            value={searchTerm}
            placeholder="Recherche..."
            className="form-control"
          />
        </div>
      </div>
    );
  }
}

export default Search;