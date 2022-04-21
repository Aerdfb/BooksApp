
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
    filters: {
      filter: '.filters',

    }
  };


  const templates = {
    bookCard: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  function render(){
    for (const book of dataSource.books){
      const ratingBgc = determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;
      console.log(ratingBgc);

      const ratingWidth = book.rating * 10;
      book.ratingWidth = ratingWidth;
      console.log(ratingWidth);
      const generatedHTML = templates.bookCard(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const listOfBooks = document.querySelector(select.books.bookList);
      listOfBooks.appendChild(element);
    }

  }
  const filters = [];
  render();

  function initActions(){

    
    const booksPanel = document.querySelector(select.books.bookPanel);
    const favoriteBooks = [];
    
    

    booksPanel.addEventListener('dblclick', function(event){
      event.preventDefault;
      const bookId = event.target.offsetParent.getAttribute(select.books.bookImageID);
      console.log(bookId);
      

      if (!favoriteBooks.includes(bookId) && event.target.offsetParent.classList.contains(select.books.bookImage)) {
        event.target.offsetParent.classList.add('favorite');
        // console.log('dodane do tablicy: ', bookId);  
        favoriteBooks.push(bookId);
      } else if (favoriteBooks.includes(bookId)){
        
        event.target.offsetParent.classList.remove('favorite');
        const index = favoriteBooks.indexOf(bookId);
        // console.log('usuniete z tablicy:', index);  
        favoriteBooks.splice(index, 1);
      }
      console.log(favoriteBooks);

      
    });

    // const filters = [];
    const filterInput = document.querySelector(select.filters.filter);
    console.log(filterInput);

    filterInput.addEventListener('click', function(event){
      event.preventDefault;
      const clickedElement = event.target;
      ;

      if (clickedElement.name  == 'filter' && clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox'){
        

        if (clickedElement.checked){
         
          filters.push(clickedElement.value);
          
          // console.log(filters);
        } else if(!clickedElement.checked){
          
          filters.splice(filters.indexOf(clickedElement.value));
          // console.log(filters);

        }

      }
      filterBooks();
    });

  }
  function filterBooks(){
    for (let book of dataSource.books){
      let shouldBeHidden = false;
      for (const filter of filters){
        // console.log(filter);
        if (!book.details[filter]){
          shouldBeHidden = true;
          console.log(book, shouldBeHidden);
        }
       
      }
      const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      console.log(filterBook);
      if (shouldBeHidden === true){
        filterBook.classList.add('hidden');
      } else {
        filterBook.classList.remove('hidden');

      }
    }
  }

  function determineRatingBgc(rating){

    if (rating <6){
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8){
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (rating > 8 && rating <= 9){
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
  }

  initActions();
}