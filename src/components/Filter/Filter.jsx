import React from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ onSearchContact }) => {
  return (
    <input
      id="outlined-search"
      onChange={onSearchContact}
      style={{
        height: '35px',
        marginBottom: '20px'
      }}
    />
  );
};

Filter.propTypes = {
  onSearchContact: PropTypes.func.isRequired,
};

export default Filter;