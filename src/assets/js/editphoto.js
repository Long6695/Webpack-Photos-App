import '../scss/addphoto.scss'
import { updatePhoto, getPhotoById } from './api'
import { Validator } from './validate'

const token = sessionStorage.getItem('token')
const getId = sessionStorage.getItem('id')
const category = document.getElementById('category')
const name = document.querySelector('.name')
const image = document.querySelector('.image')
const description = document.querySelector('.description')

if (token === null) {
  window.location.href = '/login.html'
}

Validator('#add-form', {
  onSubmit(data) {
    handleUpdatePhoto(getId, token, data)
  },
})
const handleUpdatePhoto = async (id, token, data) => {
  try {
    await updatePhoto(
      id,
      token,
      data.image,
      data.name,
      data.description,
      data.category
    )
    sessionStorage.removeItem('id')
    window.location.href = 'index.html'
  } catch (error) {
    console.log(error)
  }
}
const handleEditPhoto = async (id, token) => {
  try {
    const res = await getPhotoById(id, token)
    const photoData = res.data.data

    for (let index in category.options) {
      if (category.options[index].value === photoData.category) {
        console.log(category.options[index].value === photoData.category)
        console.log((document.getElementById('category').selectedIndex = index))
        document.getElementById('category').selectedIndex = index
      }
    }

    name.value = photoData.title
    image.value = photoData.image
    description.value = photoData.description
  } catch (error) {
    console.log(error)
  }
}

handleEditPhoto(getId, token)
