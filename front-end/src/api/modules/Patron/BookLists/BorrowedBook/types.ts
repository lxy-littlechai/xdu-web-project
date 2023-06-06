import { BookParams } from "../Book/types"

export interface BorrowedBookParams {
  book: BookParams,
  borrowedTime: Date,
  fee: number,
}

export interface GetBorrowedBookParams {
  userId: string
}