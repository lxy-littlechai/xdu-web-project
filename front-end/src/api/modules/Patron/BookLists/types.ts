import { BookParams } from "./Book/types"
import { BorrowedBookParams } from "./BorrowedBook/types"

export interface BookLists {
  bookLists: Array<BookParams>
}

export interface BorrowedBookLists {
  bookLists: Array<BorrowedBookParams>
}

export interface HistoryBookLists {
  bookLists: Array<HistoryBookLists>
}

