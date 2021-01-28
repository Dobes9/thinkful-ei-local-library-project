function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const loanedBooks = [];
  const returnedBooks = [];
  books.forEach((book) => {
    if (book.borrows.some((borrow) => !borrow.returned)) {
      loanedBooks.push(book);
  } else {
    returnedBooks.push(book);
    }
  });
  return [loanedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const bookBorrows = book.borrows.map((borrow) => {
    const bookBorrower = accounts.find((user) => user.id === borrow.id);
    const {
      picture,
      age,
      name,
      company,
      email,
      registered
    } = bookBorrower;
    return {
      ...borrow,
      picture,
      age,
      name,
      company,
      email,
      registered
    };
  });
  return bookBorrows.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
