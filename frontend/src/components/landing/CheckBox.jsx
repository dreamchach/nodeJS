import React from 'react'

const CheckBox = ({continents, checkedContinents, onFilters}) => {
  console.log(continents)
  console.log(checkedContinents)
  console.log(onFilters)

  const handleToggle=(key)=>{
    const current = checkedContinents.indexOf(key)
    const newChecked = [...checkedContinents]

    if(current === -1){
      newChecked.push(key)
    }else {
      newChecked.splice(current, 1)
    }
    onFilters(newChecked)
  }

  return (
    <div>
      {continents.map((item)=>(
        <div key={item.key}>
          <input 
          type='checkbox' 
          id={item.key} 
          checked={checkedContinents.indexOf(item.key)=== -1 ? false : true}
          onChange={()=>handleToggle(item.key)}
          />
          <label htmlFor={item.key}>{item.value}</label>
        </div>
      ))}
    </div>
  )
}

export default CheckBox