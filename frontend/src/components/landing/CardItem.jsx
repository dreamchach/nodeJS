import {Link} from 'react-router-dom'
import ImageSlider from './ImageSlider'

const CardItem = (item) => {

  return (
    <div>
      <ImageSlider images={item.item.images}/>
      <Link to={`/product/${item.item._id}`}>
        <div>{item.item.title}</div>
        <div>{item.item.continents}</div>
        <div>{item.item.price}원</div>
      </Link>
    </div>
  )
}

export default CardItem