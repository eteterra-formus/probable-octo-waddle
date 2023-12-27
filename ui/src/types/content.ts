export interface PageTree {
  pages: Page[]
}

export interface Page {
  id: string
  name: string
  children?: Page[]
}

export const isPageTree = (value: any): value is PageTree =>
  !!value.pages && value.pages.every(isPage)

export const isPage = (value: any): value is Page => {
  const invariants = [
    /**
     * id and name are required and must be non-empty strings
     */
    typeof value.id === 'string' && value.id.length > 0,
    typeof value.name === 'string' && value.name.length > 0,

    /**
     * children are optional, but when there are children,
     * they must also be valid pages.
     */
    !value.children || value.children.every(isPage)
  ]
  return invariants.every((invariant) => invariant === true)
}
