import { baseInstance } from "@/api"
const { post } = baseInstance;
import { BookLists, BorrowedBookLists, HistoryBookLists } from "./types";
import { BookParams } from "./Book/types";
import axios from "axios";

const getBookLists = (data: any) => {
  return baseInstance({
    url: "/Patron/BookSearch",
    method: 'post',
    data
  });
}

const getBorrowedBookLists = (data: any) => {
  return baseInstance({
    url: "/Patron/GetBorrowedBook",
    method: 'post',
    data
  });
}

const getHistoryBookLists = (data: any) => {
  return baseInstance({
    url: "/Patron/GetHistoricalBook",
    method: 'post',
    data
  });
}

export { getBookLists, getBorrowedBookLists, getHistoryBookLists }