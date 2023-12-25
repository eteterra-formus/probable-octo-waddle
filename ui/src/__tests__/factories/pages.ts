import type { Page } from '@/types/content'

let ids = 0

const names = [
  'Office Map',
  'New Employee Onboarding',
  'Onboarding Materials',
  'Training',
  'Office Events',
  '2018',
  'Summer Picnic',
  "Valentine's Day Party",
  "New Year's Party",
  '2017',
  'Company Anniversary Celebration',
  'Public Holidays',
  'Vacations and Sick Leaves'
]

const randomItemFrom = (items: string[]) => items[Math.floor(Math.random() * items.length)]

export interface MakePage {
  children?: Page[]
  n?: number
}
/**
 * @returns a valid page object with a sequential id,
 * as well as a random name from the list of examples.
 *
 * @param n automatically creates a number of child pages.
 */
export const makePage = ({ children = [], n = 0 }: MakePage): Page => {
  if (children.length === 0 && n > 0) {
    for (let i = 0; i < n; i++) {
      children.push(makePage({}))
    }
  }
  return {
    id: String(ids++),
    name: randomItemFrom(names),
    children
  }
}
