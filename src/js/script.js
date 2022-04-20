{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    books: {
      bookList: '.books-list',
    },
  };

  const templates = {
    bookCard: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  function render(){
    for (const book of dataSource.books){

      const generatedHTML = templates.bookCard(book);
      console.log(generatedHTML);

      const element = utils.createDOMFromHTML(generatedHTML);
      console.log(element);

      const listOfBooks = document.querySelector(select.books.bookList);
      console.log(listOfBooks);

      listOfBooks.appendChild(element);
    }

  }

  render();



}