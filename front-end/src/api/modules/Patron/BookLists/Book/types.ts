export interface BookParams {
  ISBN: string,
  id: string,
  name: string,
  author: string,
  label: Array<string>,
  img: string,
  resNumber: number
}

export interface IdBookParams {
  id: string
}

export interface ResBookParams {
  success: boolean
}
