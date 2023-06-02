import { useEffect, useState } from "react"
import instance from '../utils/axios'
import CardItem from "../components/landing/CardItem"
import CheckBox from "../components/landing/CheckBox"
import RadioBox from "../components/landing/RadioBox"
import SearchInput from "../components/landing/SearchInput"
import { continents, prices } from "../utils/functions"

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


console.log(setSearchTerm)

const fetchProducts = async({skip, limit, loadMore=false, filters={}, searchTerm=''})=>{
  const params = {
    skip,
    limit,
    filters,
    searchTerm
  }

  try {
    const response = await instance.get('/products', {params})
    if(loadMore) {
      setProducts([...products, ...response.data.product])
    }else {
      setProducts(response.data.product)
    }
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

const handleFilters = (filterData, category)=>{
  const newFilters = {...filters}
  newFilters[category]=filterData
  
  if(category === 'price') {
    const priceValue = handlePrice(filterData)
    newFilters[category] = priceValue
  }

  showFilteredResult(newFilters)
  setFilters(newFilters)
}

const handlePrice = (value) => {
  let array = []

  for(let key in prices){
    if(prices[key].key === Number(value)){
      array = prices[key].array
    }
  }
  return array
}

const showFilteredResult = (filters)=>{
  const body = {
    skip:0,
    limit,
    filters,
    searchTerm,
  }
  fetchProducts(body)
  setSkip(0)
}

const handleSearch = (event) => {
  const body={
    skip:0,
    limit,
    filters,
    searchTerm:event.target.value
  }
  setSkip(0)
  setSearchTerm(event.target.value)
  fetchProducts(body)
}

  return (
    <div>
      <div>
        <h2>여행 상품 사이트</h2>
      </div>
      <div>
        <div>
          <div>
            <CheckBox continents={continents} checkedContinents={filters.continents} onFilters={(filters)=>{handleFilters(filters, 'continents')}}/>
          </div>
          <div>
            <RadioBox prices={prices} checkedPrice={filters.price} onFilters={(filters)=>{handleFilters(filters, 'price')}}/>
          </div>
        </div>
        <div>
          <SearchInput searchTerm={searchTerm} onSearch={handleSearch}/>
        </div>
        <div>
          {products.map((item)=>(
            <div key={item._id}>
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