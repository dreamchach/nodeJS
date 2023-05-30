import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageSlider = (images) => {
    console.log(images)

  return (
    <div>
        <Carousel autoPlay showThumbs={false} infiniteLoop>
            {images.images.map((image)=>(
                <div key={image}>
                    <img src={`${import.meta.env.VITE_URL}/${image}`} alt={image}/>
                </div>
            ))}
        </Carousel>
    </div>
  )
}

export default ImageSlider