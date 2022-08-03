import React from 'react';

const SearchBar = ({ keyword, setKeyword }) => {
  const BarStyling = {
    width: '15rem',
    border: '1px solid grey',
    borderRadius: '3px',

    padding: '0.43rem',
    marginTop: '1%',
  };
  const icon = {
    position: 'absolute',
    color: 'grey',
    top: '32%',
    right: '6%',
  };
  const searchbar = {
    marginLeft: '38%',
    position: 'relative',
  };
  return (
    <div style={searchbar}>
      <input
        style={BarStyling}
        key="random1"
        value={keyword}
        placeholder={'Search'}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <i style={icon} class="fa fa-search" aria-hidden="true">
        {' '}
      </i>
    </div>
  );
};

export default SearchBar;
