import React, { Component } from 'react';
import Notiflix from 'notiflix';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });    
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      Notiflix.Notify.failure('Empty field');
      return;
    } 
    this.props.formSubmitHandler(this.state.searchQuery);
  };

  render() {
    return (
      <div className="search-bar">
        <form className="search-form form-inline" onSubmit={this.handleSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search images..."
            aria-label="Search"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.searchQuery}
            style={{ width: '1150px', height: '54px' }}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            style={{ width: '350px', height: '54px' }}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
