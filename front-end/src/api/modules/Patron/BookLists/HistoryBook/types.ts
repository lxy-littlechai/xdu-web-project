import { BookParams } from "../Book/types"

export interface HistoryBookParams {
  book: BookParams,
  borrowedTime: Date,
}

export interface GetHistoryBookParams {
  userId: string
}