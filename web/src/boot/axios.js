import Vue from 'vue'
import axios from 'axios'

let httpClient = axios.create({
  baseURL: process.env.API,
  timeout: 30000
})

// Insert jwt from localstorage in authorization header of all requests
httpClient.interceptors.request.use(config => {
  if (localStorage['zoox:token']) {
    config.headers = { 'Authorization': 'Bearer ' + localStorage['zoox:token'] }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Read the jwt from responses Authorization header and save it in localstorage
httpClient.interceptors.response.use(response => {
  // let token = response.headers.authorization
  let token = response.headers['x-amzn-remapped-authorization'] || response.headers.authorization
  if (token) {
    localStorage.setItem('zoox:token', token.startsWith('Bearer') ? token.split('Bearer')[1].trim() : token)
  } else {
    if (response.data.error) {
      // Return a promise error object to be processed by UI method
      return Promise.reject(response.data.error)
    }
  }
  // Return a response object to be processed by action or UI method
  return Promise.resolve(response)
}, error => {
  // Return a promise error object to be processed by UI method
  return Promise.reject(error)
})

Vue.prototype.$axios = httpClient

export { httpClient }
