import axios from 'axios'

export const client = axios.create({
  baseURL: 'https://probable-octo-waddle.ts.r.appspot.com/'
})
