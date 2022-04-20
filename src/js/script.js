{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    books: {
      bookList: '.books-list',
      bookImage: '.book__image',
      bookImageID: 'data-id',
    },
  };

  const templates = {
    bookCard: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  function render(){
    for (const book of dataSource.books){

      const generatedHTML = templates.bookCard(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const listOfBooks = document.querySelector(select.books.bookList);
      listOfBooks.appendChild(element);
    }

  }

  render();

  function initActions(){
    const bookImages = document.querySelectorAll(select.books.bookImage);
    console.log(bookImages);
    const favoriteBooks = [];  

    for(const image of bookImages){
      console.log(image);
      image.addEventListener('dblclick', function(event){
        event.preventDefault;
        image.classList.toggle('favorite');

        const bookId = image.getAttribute(select.books.bookImageID);
        favoriteBooks.push(bookId);

        
      });
    }
    console.log(favoriteBooks);

  }
  initActions();
}