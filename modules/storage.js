export default class Storage {
  static getBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return Array.isArray(books) ? books : [];
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}