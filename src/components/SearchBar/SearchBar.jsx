import React from 'react'

 function Searchbar({ onChange, onSubmit }) {
  return (
      <input
          type='text'
          name='searchQuery'
          value={onSubmit}
          onChange={onChange}
          autoComplete="off"
          placeholder="Search images..."
          className="form-control mr-sm-2"
          style={{ width: '1150px', height: '54px' }}
          />
  )
}


export default Searchbar;