function findAccountById(accounts, id) {
  return accounts.find((user) => user.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((user1, user2) => 
  user1.name.last.toLowerCase() > user2.name.last.toLowerCase() ? 1 : -1);
}

function numberOfBorrows(account, books) {
  const checkedID = account.id;
  let count = 0;
  books.forEach((book) => book.borrows.forEach((borrow) => {
    if (borrow.id === checkedID) {
      count++;
    };
  }));
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const result = [];
  const user = account.id;
  books.forEach((book) => {
    if (!book.borrows[0].returned && book.borrows[0].id === user) {
      const author = authors.find((selectedAuthor) => selectedAuthor.id === book.authorId);
      result.push( {
        ...book,
        author,
        borrows: book.borrows
      });
    };
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
