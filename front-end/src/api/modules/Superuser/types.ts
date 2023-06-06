export interface BookRecord {
  bookId: string,
  bookName: string,
  resNumber: number,
  totalBorrowedNumber: number,
}

export interface SystemDataParams {
  bookTotalNumber: number,
  bookBorrowedNumber: number,
  bookResNumber: number,
  bookBorrowedRecord: BookRecord
}
