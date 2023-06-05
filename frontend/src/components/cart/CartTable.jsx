import React from 'react'
import { thead } from '../../utils/functions'

const CartTable = ({product, onRemoveItem}) => {
  
  const renderImage=(images)=>{
    let image = images[0]
    return `${import.meta.env.VITE_URL}/${image}`
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {thead.map((item)=>(
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {product.length > 0 && product.map((item)=>(
            <tr key={item._id}>
              <td>
                <img alt={item} src={renderImage(item.images)}/>
              </td>
              <td>
                {item.qua}개
              </td>
              <td>
                {item.price}원
              </td>
              <td>
                <button onClick={()=>onRemoveItem(item._id)}>지우기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CartTable