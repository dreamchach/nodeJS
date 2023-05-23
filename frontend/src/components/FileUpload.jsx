// import instance from '../utils/axios'
import Dropzone from 'react-dropzone'

const FileUpload = (images) => {
    console.log(images.images)
    
    const handleDrop = (files)=>{
        let formData = new FormData()

       const config = {
            header:{'content-type' : 'multipart/form-data'}
        }
        console.log(config)

        formData.append('file', files[0])

        try {
            // const response = instance.post('/products/image', formData, config)
            images.onImageChange([...images.images, ...files])
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>
        <Dropzone onDrop={handleDrop}>
            {({getRootProps, getInputProps})=>(
                <div>
                    <div {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <p>+</p>
                    </div>
                </div>
            )}
        </Dropzone>

        <div>
        {images.images.map(image=>(
                <div key={image}>
                   <img src={`${import.meta.env.VITE_URL}/${image}`} alt={image.name}/>
               </div>
            ))}
        </div>
    </div>
  )
}

export default FileUpload