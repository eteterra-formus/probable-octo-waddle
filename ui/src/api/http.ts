import axios from 'axios'

export const client = axios.create({
  timeout: 3,
  baseURL: 'https://probable-octo-waddle.ts.r.appspot.com/'
})
