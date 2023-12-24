import axios from 'axios'

export interface PageTree {
    nodes: ContentNode[]
}

export interface ContentNode {
    id: string,
    name: string,
    children?: ContentNode[]
  }

export function loadPageTree() {
    return axios
    .get<PageTree>('https://probable-octo-waddle.ts.r.appspot.com/pages')
    .then(result => result.data)
}
