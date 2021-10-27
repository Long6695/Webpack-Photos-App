import axios from 'axios'

const API = 'https://tony-auth-express.herokuapp.com/'

export const loginUser = async (email, password) => {
  const bodyData = {
    email,
    password,
  }

  return axios({
    method: 'POST',
    url: API + 'api/user/login',
    data: bodyData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const checkAuth = async (token) => {
  return axios({
    method: 'POST',
    url: API + 'api/auth',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
}

export const getListPhotos = async (token) => {
  return axios({
    method: 'GET',
    url: API + 'api/photo',
    headers: {
      // 'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
}

export const addPhoto = async (token, image, title, description, category) => {
  const bodyData = {
    image,
    title,
    description,
    category,
  }

  return axios({
    method: 'POST',
    url: API + 'api/photo',
    data: bodyData,
    headers: {
      // 'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
}

export const getPhotoById = async (id, token) => {
  return axios({
    method: 'GET',
    url: API + 'api/photo/' + id,
    headers: {
      'x-auth-token': token,
    },
  })
}
