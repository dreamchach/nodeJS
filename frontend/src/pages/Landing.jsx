import { useEffect, useState } from "react"
import instance from '../utils/axios'
import CardItem from "../components/landing/CardItem"
import CheckBox from "../components/landing/CheckBox"
import RadioBox from "../components/landing/RadioBox"
import SearchInput from "../components/landing/SearchInput"

const Landing = () => {
const limit = 4
//const [searchTerm, setSearchTerm] = useState('')
const [products, setProducts] = useState([])
const [skip, setSkip] = useState(0)
const [hasMore, setHasMore] = useState(false)
//const [filters, setFilters] = useState({
//  continents:[],
//  price:[]
//})

console.log(setProducts, setSkip, setHasMore)

const fetchProducts = (skip, limit, loadMore=false, filters={}, searchTerm='')=>{
  const params = {
    skip,
    limit,
    filters,
    searchTerm
  }

  console.log(loadMore)

  try {
    const response = instance.get('/products', {params})
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchProducts(skip, limit)
}, [])


  return (
    <div>
      <div>
        <h2>여행 상품 사이트</h2>
      </div>
      <div>
        <div>
          <div>
            <CheckBox/>
          </div>
          <div>
            <RadioBox/>
          </div>
        </div>
        <div>
          <SearchInput/>
        </div>
        <div>
          {products.map((_, index)=>(
            <CardItem key={index}/>
          ))}
        </div>
        {hasMore && (
          <div>
            <button>더 보기</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Landing