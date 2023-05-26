import { useEffect, useState } from 'react'
import instance from '../utils/axios'
import Dropzone from 'react-dropzone'

const FileUpload = (props) => {
const prop = props
const [images, setImages] = useState(prop.images)
const onImageChange = prop.onImageChange

console.log(images)

useEffect(() => {
    setImages(prop.images)
}, [props])

    const handleDrop = (files)=>{
        let formData = new FormData()

       const config = {
        headers:{'Content-Type' : 'multipart/form-data'}
       }

        formData.append('file', files[0])

    
        try {
            const response = instance.post('/products/image', formData, config)
            const fileName = response
            fileName.then((name)=>{
                onImageChange([...images, name.data.fileName])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (image)=>{
      const currentIndex = images.indexOf(image)
      let newImages = [...images]
      newImages.splice(currentIndex, 1)
      onImageChange(newImages)
    }

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>+</p>
            </div>
          </div>
        )}
      </Dropzone>

      <div>
        {images.map(image => (
          <div key={image} onClick={()=>handleDelete(image)}>
            <img
              src={`${import.meta.env.VITE_URL}/${image}`}
              alt={image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload