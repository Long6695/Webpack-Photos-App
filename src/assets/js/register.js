import '../scss/register.scss'
import { Validator } from '../js/validate'
import { addNewUser } from './api'

const randomBtn = document.getElementById('header__btn')
const token = sessionStorage.getItem('token')
const btnLink = document.querySelector('.btn-link')

randomBtn.addEventListener('click', () => {
  const randomNum = Math.floor(Math.random() * 50)
  const avatar = document.getElementById('avatar')
  avatar.src = `https://i.pravatar.cc/150?img=${randomNum}`
})

btnLink.addEventListener('click', () => {
  window.location.href = 'login.html'
})

if (token !== null) {
  window.location.href = '/index.html'
}

Validator('#add-form', {
  onSubmit(data) {
    handleAddUser(data)
  },
})

async function handleAddUser(data) {
  try {
    await addNewUser(
      avatar.src,
      data.firstName,
      data.lastName,
      data.email,
      data.role,
      data.password
    )
    window.location.href = '/login.html'
  } catch (error) {
    const email = document.querySelector('#message-email')
    const formGroup = email.parentElement
    formGroup.classList.add('invalid')
    email.innerText = error.response.data.msg
  }
}
