import '../scss/index.scss'
import { checkAuth, getListPhotos } from './api'

const token = sessionStorage.getItem('token')
const firstName = document.getElementById('firstname')
const avatar = document.getElementById('avatar')
const logoutBtn = document.getElementById('log-out')
const addBtn = document.getElementById('add-btn')

addBtn.addEventListener('click', () => {
  window.location.href = '/addphoto.html'
})

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('token')
  window.location.href = '/login.html'
})

const doubleCheck = async (page = 1) => {
  const url = window.location.search
  const params = new URLSearchParams(url)
  const pageParam = params.get('page') || page

  try {
    const res = await checkAuth(token)
    firstName.innerHTML = res.data.user.user.firstName
    avatar.src = res.data.user.user.avatar

    const resPhoto = await getListPhotos(token, pageParam, 10)
    const photos = resPhoto.data.data

    const photoGroup = document.getElementById('photos__wrapper')

    const htmls = photos.map((photo) => {
      return `
      <div class="photos__group" id="${photo._id}">
      <div class="photos__group__main">
      <div class="photos__group__main__img">
      <img id="avatar" class="photos__group__main--img" src="${
        photo.image
      }" alt="" />
      </div>
      </div>
      <div class="photos__group__footer">
      <div class="photos__group__main__des">
      ${photo.description}
      </div>
      <div class="photos__group__footer--btn">
      <div>
      <button class="btn photo__btn" onclick="sessionStorage.setItem('id','${
        photo._id
      }')
      window.location.href = '/detailphoto.html'
      ">
      
      View
      
      </button>
      <button class="btn photo__btn">Edit</button>
      </div>
      <div class="photos__group__footer--time"><span>${new Date(
        photo.date
      ).getMinutes()} mins ago</span></div>
      </div>
      </div>
      </div>
      `
    })

    photoGroup.innerHTML = htmls.join('')
    const pageNum = Math.round(resPhoto.data.total / resPhoto.data.limit)
    paginition(pageNum)

    const nextBtn = document.querySelector('.page__next--btn')
    const previousBtn = document.querySelector('.page__previous--btn')

    let pageIndex = parseInt(pageParam)

    nextBtn.addEventListener('click', () => {
      if (pageIndex === pageNum) {
        nextBtn.classList.add('disabled')
      } else {
        pageIndex++
        window.location.replace(`/index.html?page=${pageIndex}`)
        doubleCheck(pageIndex)
      }
    })

    previousBtn.addEventListener('click', () => {
      if (pageIndex <= 1) {
        previousBtn.classList.add('disabled')
      } else {
        pageIndex--
        window.location.replace(`/index.html?page=${pageIndex}`)
        doubleCheck(pageIndex)
      }
    })

    const currentLi = document.querySelector(
      `.page__item:nth-child(${pageParam})`
    )
    currentLi.classList.add('active')
  } catch (error) {
    window.location.href = '/login.html'
  }
}
doubleCheck()

function paginition(num) {
  const numArray = Array.from(Array(num).keys())
  const ul = document.querySelector('.page__nav')
  const liArray = numArray.map((item, index) => {
    return `
      <li id="${index + 1}"class="page__item"><a class="page__link" href="#">${
      item + 1
    }</a></li>
      `
  })

  ul.innerHTML = liArray.join('')

  const getLi = document.querySelectorAll('.page__item')

  getLi.forEach((item, index) => {
    item.addEventListener('click', () => {
      window.location.replace(`/index.html?page=${index + 1}`)
      const currentIndex = index + 1

      doubleCheck(currentIndex)
    })
  })
}
