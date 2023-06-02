import React from 'react'

const SearchInput = ({searchTerm, onSearch}) => {
  return (
    <div>
      <input
        type='text'
        placeholder='검색하세요'
        onChange={onSearch}
        value={searchTerm}
      />
    </div>
  )
}

export default SearchInput