import { useState } from "react"
import { continents } from "../utils/functions"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import instance from "../utils/axios"

const Upload = () => {
  const [product, setProduct] = useState({
    title:'',
    description:'',
    price:0,
    continents:1,
    images:[]
  })

  const userData = useSelector(state=>state.user?.userData)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const {name, value} = event.target

    setProduct((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  const handleSubmit = (event)=>{
    event.preventDefault()

    const body = {
      writer:userData.id,
      ...product
    }

    try{
      instance.post('/products', body)
      navigate('/')
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div>
      <div>
        <h1>예상 상품 업로드</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">이름</label>
          <input name="title" id="title" onChange={handleChange} value={product.title}/>
        </div>

        <div>
          <label htmlFor="description">설명</label>
          <input name="description" id="description" onChange={handleChange} value={product.description}/>
        </div>

        <div>
          <label htmlFor="price">가격</label>
          <input name="price" id="price" onChange={handleChange} value={product.price}/>
        </div>

        <div>
          <label htmlFor="continents">지역</label>
          <select name="continents" id="continents" onChange={handleChange} value={product.continents}>
            {continents.map((item)=>(
              <option key={item.key} value={item.key}>{item.value}</option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">
            생성하기
          </button>
        </div>

      </form>
    </div>
  )
}

export default Upload