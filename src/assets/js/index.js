import '../scss/index.scss'
import { checkAuth, getListPhotos } from './api'

const token = sessionStorage.getItem('token')
const firstName = document.getElementById('firstname')
const avatar = document.getElementById('avatar')
const logoutBtn = document.getElementById('log-out')

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('token')
  window.location.href = '/login.html'
})

const doubleCheck = async () => {
  try {
    const res = await checkAuth(token)
    firstName.innerHTML = res.data.user.user.firstName
    avatar.src = res.data.user.user.avatar

    const resPhoto = await getListPhotos(token)
    const photos = resPhoto.data.data

    const photoGroup = document.getElementById('photos__wrapper')
    const htmls = photos.map((photo) => {
      console.log(photo)
      return `
      <div class="photos__group" ${photo.id}>
      <div class="photos__group__main">
        <div class="photos__group__main__img">
        <img id="avatar" class="photos__group__main--img" src="${photo.image}" alt="" />
        </div>
        <div class="photos__group__main__des">
          ${photo.description}
        </div>
      </div>
      <div class="photos__group__footer">
        <div class="photos__group__footer--btn">
          <button class="btn photo__btn">View</button>
          <button class="btn photo__btn">Edit</button>
        </div>
        <div class="photos__group__footer--time"><span>9 mins</span></div>
      </div>
    </div>
      `
    })
    photoGroup.innerHTML = htmls.join('')
  } catch (error) {
    window.location.href = '/login.html'
  }
}

doubleCheck()
