import { useEffect, useState } from "react"
import instance from '../utils/axios'
import CardItem from "../components/landing/CardItem"
import CheckBox from "../components/landing/CheckBox"
import RadioBox from "../components/landing/RadioBox"
import SearchInput from "../components/landing/SearchInput"

const Landing = () => {
const limit = 4
const [searchTerm, setSearchTerm] = useState('')
const [products, setProducts] = useState([])
const [skip, setSkip] = useState(0)
const [hasMore, setHasMore] = useState(false)
const [filters, setFilters] = useState({
  continents:[],
  price:[]
})

useEffect(() => {
  fetchProducts({skip, limit})
}, [])


console.log(setHasMore, setSearchTerm, setFilters)

const fetchProducts = async({skip, limit, loadMore=false, filters={}, searchTerm=''})=>{
  const params = {
    skip,
    limit,
    filters,
    searchTerm
  }

  try {
    const response = await instance.get('/products', {params})
      setProducts([...products, ...response.data.product])
      setHasMore(response.data.hasMore)
  } catch (error) {
    console.log(error)
  }
}

const handleLoadMore = () => {
  const body = {
    skip:skip+limit,
    limit,
    loadMore:true,
    filters,
    searchTerm
  }
  fetchProducts(body)
  setSkip(skip+limit)
}

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
          {products.map((item)=>(
            <div  key={item._id}>
              <CardItem item={item} />
            </div>
          ))}
        </div>
        {hasMore && (
          <div>
            <button onClick={handleLoadMore}>더 보기</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Landing