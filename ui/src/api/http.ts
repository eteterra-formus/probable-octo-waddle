import axios from 'axios'
import { retryOnError } from './interceptors'

export const client = axios.create({
  timeout: 3,
  baseURL: 'https://probable-octo-waddle.ts.r.appspot.com/'
})

/**
 * retry failed requests up to 3 times,
 * waiting some time in between each request.
 */
client.interceptors.response.use(null, retryOnError)
