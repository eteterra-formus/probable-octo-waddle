export interface PageTree {
  pages: Page[]
}

export interface Page {
  id: string
  name: string
  children?: Page[]
}

export const isPage = (value: any): value is Page => {
  return true
}
