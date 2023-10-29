import React, { useEffect, useState } from "react";
import { deleteImage, getImagesData, uploadImage } from "./server/imagesRequests";
function App() {
  // const URL = "https://photos-storage-yis.s3.eu-west-1.amazonaws.com/"
  const URL = "http://localhost:3030/get-image"

  const [images, setImages] = useState([])

  useEffect(()=>{
    getImagesData()
    .then(newImages=>{
      setImages(newImages)
    })
  },[])


  const onSubmitForm = async (event) =>{
    event.preventDefault()
    const image = event.target.children[0].files[0]
    const formData = new FormData()
    formData.append("image", image)

    const res = await uploadImage(formData)

    const newImages = await getImagesData()

    setImages(newImages)
  }

  const onClickDelete = async (id, key) =>{
    await deleteImage(id, key)
    const newImages = await getImagesData()
    setImages(newImages)
  }

  return (
      <div>
      <form onSubmit={onSubmitForm}>
        <input type="file" name="image" />
        <button type="submit">submit</button>
      </form>
      {images.map(image=> <div key={image._id}>
        <h3>{image.originalName}</h3>
        <img src={URL+`?key=${image.key}&name=${image.originalName}`} alt={image.originalName} />
        <button onClick={()=>{onClickDelete(image._id,image.key)}}>Delete {image.originalName}</button>
      </div>)}
      </div>
  );
}

export default App;
