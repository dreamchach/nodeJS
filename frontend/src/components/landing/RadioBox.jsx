import React from 'react'

const RadioBox = ({prices, checkedPrice, onFilters}) => {
  console.log(checkedPrice)
  
  return (
    <div>
      {prices.map((price)=>(
        <div key={price.key}>
          <input type='radio' id={price.key} name='price' value={price.key} onChange={event=>onFilters(event.target.value)}/>
          <label htmlFor={price.key}>{price.name}</label>
        </div>
      ))}
    </div>
  )
}

export default RadioBox