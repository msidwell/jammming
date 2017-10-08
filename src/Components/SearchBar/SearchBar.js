import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }
  search() {
    this.props.onSearch(this.state.searchTerm)
  }
  handleTermChange(event) {
    this.setState({searchTerm: document.getElementById("searchTerm").value});
  }
  handleClick() {
    this.search()
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          id="searchTerm"
          placeholder="Enter A Song, Album, or Artist"
          value={this.state.searchTerm}
          onChange={this.handleTermChange}
        />
        <a onClick={this.handleClick}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
