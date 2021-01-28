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
  const orderedPopularGenres = mostPopularGenres.sort((genre1, genre2) => genre2.count - genre1.count);
  return orderedPopularGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  const booksByCheckouts = books.map((book) => {
    return {
      name: book.title,
      count: book.borrows.length
    };
  })
  const sortedBooks = booksByCheckouts.sort((book1, book2) => book2.count - book1.count);
  return sortedBooks.slice(0, 5);
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
  const orderedPopularAuthors = popularAuthors.sort((author1, author2) => author2.count - author1.count);
  return orderedPopularAuthors.slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
