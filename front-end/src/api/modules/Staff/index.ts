import { baseInstance } from "@/api/instance";
const { post } = baseInstance;

import { addBookParams, IdBookParams, ResBookParams, UserParams } from "./types";

const getBookFromLocal = (data: any) => {
  return baseInstance({
    url: "/Staff/GetBookFromLocal",
    method: "post",
    data
  })
}

const addBookToLocal = (data: any) => {
  return baseInstance({
    url: "/Staff/AddBookToLocal",
    method: "post",
    data
  })
}

const getBookFromCloud = (data: any) => {
  console.log(data.ISBN)
  return baseInstance({
    url: `https://api.ibook.tech/v1/book/isbn?isbn=${data.ISBN}&uKey=ff15fa4c8b984f629c2c13db3bc336fa`,
    method: "get"
  })
}


const getBookByISBN = (data: any) => {
  return baseInstance({
    url: "/Staff/GetBookByISBN",
    method: "post",
    data
  });
}

const addBook = (data: any) => {
  return baseInstance({
    url: "/Staff/AddBook",
    method: "post",
    data
  });
}

const deleteBook = (data: any) => {
  return baseInstance({
    url: "/Staff/DeleteBook",
    method: "post",
    data
  });
}

const updateBook = (data: any) => {
  return baseInstance({
    url: "/Staff/UpdateBook",
    method: "post",
    data
  });
}

const borrowBook = (data: any) => {
  return baseInstance({
    url: "/Staff/BorrowBook",
    method: "post",
    data
  });
}

const returnBook = (data: any) => {
  return baseInstance({
    url: "/Staff/ReturnBook",
    method: "post",
    data
  });
}

const confirmPay = (data: any) => {
  return baseInstance({
    url: "/Staff/confirmPay",
    method: "post",
    data
  });
}

const payFee = (data: any) => {
  return baseInstance({
    url: "/Staff/payFee",
    method: "post",
    data
  });
}

const alipay = (data: any) => {
  return baseInstance({
    url: "/Staff/alipay",
    method: "post",
    data
  });
}

export {
  getBookFromLocal,
  addBookToLocal,
  getBookFromCloud,
  getBookByISBN,
  addBook,
  deleteBook,
  updateBook,
  returnBook,
  borrowBook,
  payFee,
  confirmPay,
  alipay
};