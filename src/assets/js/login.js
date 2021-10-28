import { loginUser } from './api'
const emailInput = document.getElementById('email_address')
const passwordInput = document.getElementById('password')
const formSubmit = document.getElementById('login-form')
const btnLink = document.querySelector('.btn-link')

btnLink.addEventListener('click', () => {
  window.location.href = 'register.html'
})
console.log(emailInput.value, passwordInput.value)

if (sessionStorage.getItem('token')) {
  window.location.href = '/index.html'
}

formSubmit.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const res = await loginUser(emailInput.value, passwordInput.value)
    sessionStorage.setItem('token', res.data.token)
    window.location.href = '/index.html'
  } catch (error) {
    const message = document.getElementById('message')
    message.style.color = 'red'
    message.innerText = error.response.data.msg
  }
})
