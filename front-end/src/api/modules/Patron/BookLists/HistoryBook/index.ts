import { historyBookInstace } from "@/api"
const { post } = historyBookInstace;
import { HistoryBookParams, GetHistoryBookParams } from "./types"


const getHistoryBorrowedBook = (params: GetHistoryBookParams) => {
  return post<HistoryBookParams>("/url", params);
}

export { getHistoryBorrowedBook }