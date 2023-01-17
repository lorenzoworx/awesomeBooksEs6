import Book from './modules/books.js'
import Storage from './modules/storage.js'
import UI from './modules/interface.js'
import { DateTime } from "./modules/luxon.js";


const addBtn = document.querySelector('.add-book-btn');
const newTitleInput = document.querySelector('.add-title-input');
const newAuthorInput = document.querySelector('.add-author-input');
const libraryContainer = document.querySelector('.library');
const listLink = document.querySelector('.nav-list');
const addLink = document.querySelector('.nav-add');
const contactLink = document.querySelector('.nav-contact');
const listSection = document.querySelector('.list-section');
const addSection = document.querySelector('.add-section');
const contactSection = document.querySelector('.contact-section');
const dateToday = document.querySelector('.date-display');
let newId = 0;
// NAVBAR INTERACTIONS
listLink.addEventListener('click', () => {
  listSection.style.display = 'flex';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
});
addLink.addEventListener('click', () => {
  addSection.style.display = 'flex';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
});
contactLink.addEventListener('click', () => {
  contactSection.style.display = 'flex';
  listSection.style.display = 'none';
  addSection.style.display = 'none';
});


const addBookPressed =  (e) => {
  e.preventDefault();
  const books = Storage.getBooks();
  const newTitle = newTitleInput.value;
  const newAuthor = newAuthorInput.value;
  let newId;
  const len = books.length;
  if (len === 0 || len === null) {
    newId = 0;
  } else {
    newId = books[len - 1].id + 1;
  }
  if (newTitle && newAuthor) {
    const newBook = new Book(newTitle, newAuthor, newId); //
    Storage.addBook(newBook);
    UI.addBooktoLibrary(newBook);
    UI.clearFields();
  }
};
// Function to remove new Book
const removeBook =  (e) => {
  if (e.target.classList.contains('remove-btn')) {
    let library = Storage.getBooks();
    const { id } = e.target;
    library = library.filter((bk) => JSON.stringify(bk.id) !== id);
    localStorage.setItem('books', JSON.stringify(library));
    e.target.parentElement.remove();
  }
};
/// // EVENT LISTENERS
addBtn.addEventListener('click', addBookPressed);
libraryContainer.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', UI.displayBook);


// Display date
const dateDisplay =  DateTime.now().toLocaleString(DateTime.DATETIME_MED);
dateToday.textContent = dateDisplay;
document.addEventListener('DOMContentLoaded', dateToday);
