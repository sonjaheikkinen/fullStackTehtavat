import React from 'react'

const FilterForm = ({ filterValue, handleFilterValueChange }) => {
    return (
      <div>
        filter shown with: <input value={filterValue}
          onChange={handleFilterValueChange} />
      </div>
    )
  }

  export default FilterForm