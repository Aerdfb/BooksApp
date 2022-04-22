
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

  class bookList {
    constructor(){
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.render();
      thisBookList.getElements();
      thisBookList.initActions();
    
    }

    initData(){
      this.data = dataSource.books;
      this.favoriteBooks = [];
      this.filters = [];
    }
  

    getElements(){
      const thisBookList = this;
      thisBookList.dom = {};

      thisBookList.dom.container = document.querySelector(select.books.bookList);
      thisBookList.dom.form = document.querySelector(select.filters.filter);
      thisBookList.dom.panel = document.querySelector(select.books.bookPanel);
      
    }

    render(){
      const thisBookList = this;
      for (const book of this.data){
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;

        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.bookCard(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        const listOfBooks = document.querySelector(select.books.bookList);
        listOfBooks.appendChild(element);
      }

    }

    initActions(){
      const thisBookList = this;
      
      const booksPanel = thisBookList.dom.panel;

      booksPanel.addEventListener('dblclick', function(event){
        event.preventDefault;
        const bookId = event.target.offsetParent.getAttribute(select.books.bookImageID);

        if (!thisBookList.favoriteBooks.includes(bookId) && event.target.offsetParent.classList.contains(select.books.bookImage)) {
          event.target.offsetParent.classList.add('favorite');
          thisBookList.favoriteBooks.push(bookId);
        } 
        else if (thisBookList.favoriteBooks.includes(bookId)){
          event.target.offsetParent.classList.remove('favorite');
          const index = thisBookList.favoriteBooks.indexOf(bookId);
          thisBookList.favoriteBooks.splice(index, 1);
        }


        
      });

      const filterInput = thisBookList.dom.form;

      filterInput.addEventListener('click', function(event){
        event.preventDefault;
        const clickedElement = event.target;
        

        if (clickedElement.name  == 'filter' && clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox'){
          

          if (clickedElement.checked){
          
            thisBookList.filters.push(clickedElement.value);
            
          } else if(!clickedElement.checked){
            
            thisBookList.filters.splice(thisBookList.filters.indexOf(clickedElement.value));
          }

        }
        thisBookList.filterBooks();
      });

    }
    filterBooks(){
      const thisBookList = this;
      for (let book of dataSource.books){
        let shouldBeHidden = false;
        for (const filter of thisBookList.filters){
          if (!book.details[filter]){
            shouldBeHidden = true;
          }
        
        }
        const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if (shouldBeHidden === true){
          filterBook.classList.add('hidden');
        } else {
          filterBook.classList.remove('hidden');

        }
      }
    }

    determineRatingBgc(rating){

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
  }
  const app = new bookList();
} 
