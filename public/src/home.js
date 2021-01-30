/* Helper function to sort arrays from greatest value to least, then return the first 5 entries. Functions getMostCommonGenres,
getMostPopularBooks, and getMostPopularAuthors all generate arrays with objects with 2 properties:
name: "", count: num.  This helper function sorts using the value from the count property. */

function _helperReturnFiveGreatest(array) {
  return array.sort((a, b) => b.count - a.count).slice(0, 5);
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
/* In getMostCommonGenres, I use the reduce method to create a single object with each property key being one of the genres from the books array,
and each key's value contains each book object that corresponds to that genre. With that object, I use a for/in loop to generate a new array,
where each index is an object that looks like: {name: "genre", count: num}. The count is equal to the number of books of that particular genre. */

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
  return _helperReturnFiveGreatest(mostPopularGenres);
}

function getMostPopularBooks(books) {
  const booksByCheckouts = books.map((book) => {
    return {
      name: book.title,
      count: book.borrows.length
    };
  })
  return _helperReturnFiveGreatest(booksByCheckouts);
}
/* In getMostPopularAuthors, for each author, I accumulate the number of checkouts from each book that corresponds to 
that particular author. I then map a new array, where each index contains:
{name: "first last", count: num(total checkouts)} of each author. */

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
  return _helperReturnFiveGreatest(popularAuthors);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
