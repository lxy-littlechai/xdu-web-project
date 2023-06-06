import { borrowedBookInstace } from "@/api"
const { post } = borrowedBookInstace;
import { BorrowedBookParams, GetBorrowedBookParams } from "./types"


const getBorrowedBook = (params: GetBorrowedBookParams) => {
  return post<BorrowedBookParams>("/url", params);
}

export { getBorrowedBook }