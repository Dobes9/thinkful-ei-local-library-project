function _helperSortGreatestToLeast(array) {
  return array.sort((a, b) => b.count - a.count);
}

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  const loanedBooks = books.filter((book) => book.borrows.some((borrow) => !borrow.returned));
  return loanedBooks.length;
}

function getMostCommonGenres(books) {
  const mostPopularGenres = [];
  const groupedByGenres = books.reduce((acc, book) => {
    let key = book.genre;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(book);
    return acc;
  }, {});
  for (let genre in groupedByGenres) {
    const selectedGenre = groupedByGenres[genre];
    const popularGenre = {
      name: genre,
      count: selectedGenre.length
    };
    mostPopularGenres.push(popularGenre);
  };
  return _helperSortGreatestToLeast(mostPopularGenres).slice(0, 5);
}

function getMostPopularBooks(books) {
  const booksByCheckouts = books.map((book) => {
    return {
      name: book.title,
      count: book.borrows.length
    };
  })
  return _helperSortGreatestToLeast(booksByCheckouts).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map((author) => {
    let count = 0;
    books.forEach((book) => {
      if (book.authorId === author.id) {
        count += book.borrows.length;
      }
    })
    const {
      name: {first, last}
    } = author;
    return {
      name: `${first} ${last}`,
      count
    };
  });
  return _helperSortGreatestToLeast(popularAuthors).slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
