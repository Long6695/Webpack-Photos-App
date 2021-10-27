import '../scss/detailphoto.scss'
import { getPhotoById } from './api'
const token = sessionStorage.getItem('token')
const id = sessionStorage.getItem('id')
const btnBack = document.querySelector('.detail__photo--back')

btnBack.addEventListener('click', () => {
  sessionStorage.removeItem('id')
})
export const getPhotoDetail = async () => {
  const res = await getPhotoById(id, token)

  const photoDetail = res.data.data
  const htmls = `<div class="content__img">
    <img src="${photoDetail.image}" alt="" />
   </div>
 <div class="content__detail">
   <h3 class="content__detail__title">${photoDetail.title}</h3>
   <p class="content__detail__des">
     ${photoDetail.description}
   </p>
   <span>${new Date(photoDetail.date).getMinutes()} mins ago</span>
 </div>`

  const wrapper = document.getElementById('detail__photo--content')
  wrapper.innerHTML = htmls
}

getPhotoDetail()
