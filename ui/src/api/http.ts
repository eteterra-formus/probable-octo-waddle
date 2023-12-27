import axios from 'axios'
import { retryOnError } from './interceptors'

const THREE_SECONDS = 3000

export const client = axios.create({
  timeout: THREE_SECONDS,
  baseURL: 'https://probable-octo-waddle.ts.r.appspot.com/'
})

/**
 * retry failed requests up to 3 times,
 * waiting some time in between each request.
 */
client.interceptors.response.use(null, retryOnError)
