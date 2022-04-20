{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    books: {
      bookList: '.books-list',
      bookImage: 'book__image',
      bookImageID: 'data-id',
      bookPanel: '.books-panel',
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
    // const bookImages = document.querySelectorAll(select.books.bookImage);
    const booksPanel = document.querySelector(select.books.bookPanel);
    // console.log(booksPanel);
    const favoriteBooks = [];
    
    

    booksPanel.addEventListener('click', function(event){
      event.preventDefault;
      const bookId = event.target.offsetParent.getAttribute(select.books.bookImageID);
      console.log(bookId);
      

      if (!favoriteBooks.includes(bookId) && event.target.offsetParent.classList.contains(select.books.bookImage)) {
        event.target.offsetParent.classList.add('favorite');
        console.log('dodane do tablicy: ', bookId);  
        favoriteBooks.push(bookId);
      } else if (favoriteBooks.includes(bookId)){
        
        event.target.offsetParent.classList.remove('favorite');
        const index = favoriteBooks.indexOf(bookId);
        console.log('usuniete z tablicy:', index);  
        favoriteBooks.splice(index, 1);
      }
      console.log(favoriteBooks);

    });
    // for(const image of bookImages){
    //   console.log(image);
    //   image.addEventListener('click', function(event){
    //     event.preventDefault;

        
        

    //     if(index == -1) {
    //       image.classList.add('favorite');
    //       console.log('działa');  
    //       favoriteBooks.push(bookId);
    //     }
    //     else {
    //       image.classList.remove('favorite');
    //       favoriteBooks.splice(index, 1);
    //       console.log(favoriteBooks);
    //     }
    //   });

      
  
    

  }
  initActions();
}