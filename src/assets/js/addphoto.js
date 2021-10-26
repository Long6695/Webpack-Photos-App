import '../scss/addphoto.scss'
import { addPhoto } from './api'
import { Validator } from './validate'
const token = sessionStorage.getItem('token')

if (token === null) {
  window.location.href = '/login.html'
}

Validator('#add-form', {
  onSubmit(data) {
    handleAddPhoto(token, data)
  },
})

const handleAddPhoto = async (token, data) => {
  try {
    await addPhoto(
      token,
      data.image,
      data.name,
      data.description,
      data.category
    )
    window.location.href = '/index.html'
  } catch (error) {
    console.log(error)
  }
}
