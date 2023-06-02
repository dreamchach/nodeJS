import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

const ProductImage = ({product}) => {
    const [images, setImages] = useState([])

    useEffect(() => {
      if(product?.images?.length > 0){
        let array = []
        product.images.map((image)=>{
            return array.push({
                original:`${import.meta.env.VITE_URL}/${image}`,
                thumbnail:`${import.meta.env.VITE_URL}/${image}`
            })
        })
        setImages(array)
      }
    }, [product])
    console.log(images)
    
  return (
    <div>
        <ImageGallery items={images}/>
    </div>
  )
}

export default ProductImage