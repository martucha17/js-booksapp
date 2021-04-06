/* eslint-disable indent */
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
/* eslint-disable no-unused-vars */



{
    'use strict';

    const select = {
        books: '#template-book',
        booksList: '.books-list',
        bookImage: '.book__image',
        bookId: '.data-id',
        favoriteBook: '.favorite',
        filtersForm: '.filters',
    };

    const templates = {
        books: Handlebars.compile(document.querySelector(select.books).innerHTML)
    };

    class BooksList {
        constructor(element) {
            const thisBooksList = this;


            thisBooksList.favoriteBooks = [];
            thisBooksList.filters = [];

            thisBooksList.initData();
            thisBooksList.render();
            thisBooksList.getElements(element);
            thisBooksList.initActions();

        }
        initData() {
            const thisBooksList = this;
            this.data = dataSource.books;
        }

        getElements(element) {
            const thisBooksList = this;

            thisBooksList.dom = {};

            thisBooksList.dom.wrapper = element;

            thisBooksList.dom.booksList = thisBooksList.dom.wrapper.querySelector(select.booksList);
            thisBooksList.dom.filtersForm = thisBooksList.dom.wrapper.querySelector(select.filtersForm);


        }

        render() {
            const thisBooksList = this;

            for (let elem of dataSource.books) {

                elem.ratingBgc = thisBooksList.determineRatingBgc(elem.rating);

                elem.ratingWidth = elem.rating * 10;

                const generatedHTML = templates.books(elem);

                const elementDOM = utils.createDOMFromHTML(generatedHTML);

                const booksList = document.querySelector(select.booksList);

                booksList.appendChild(elementDOM);

            }

        }

        initActions() {
            const thisBooksList = this;

            thisBooksList.dom.booksList.addEventListener('dblclick', function (event) {
                event.preventDefault();
                const img = event.target.offsetParent;
                const bookId = img.getAttribute('data-id');

                if (img.classList.contains('book__image')) {

                    if (thisBooksList.favoriteBooks.includes(bookId)) {
                        img.classList.remove('favorite');
                        const index = thisBooksList.favoriteBooks.indexOf(bookId);
                        thisBooksList.favoriteBooks.splice(index, 1);
                    } else {
                        img.classList.add('favorite');

                        thisBooksList.favoriteBooks.push(bookId);
                    }
                }

            });



            thisBooksList.filtersForm.addEventListener('click', function (callback) {
                if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
                    console.log(event.target.value);
                }
                if (event.target.checked == true) {
                    thisBooksList.filters.push(event.target.value);
                } else {
                    const index = thisBooksList.filters.indexOf(event.target.value);
                    thisBooksList.filters.splice(index, 1);
                }
                thisBooksList.filterBooks();
            });

        }

        filterBooks() {
            const thisBooksList = this;

            for (let book of dataSource.books) {
                let shouldBeHidden = false;
                for (let filter of thisBooksList.filters) {
                    if (!book.details[filter]) {
                        shouldBeHidden = true;
                        break;
                    }
                }

                const bookElem = document.querySelector(select.bookImage + '[data-id = "' + book.id + '"]');

                if (shouldBeHidden) {
                    bookElem.classList.add('hidden');
                } else {
                    bookElem.classList.remove('hidden');
                }

            }

        }

        determineRatingBgc(rating) {
            const thisBooksList = this;

            if (rating < 6) return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            else if (rating > 6 && rating <= 8) return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
            else if (rating > 8 && rating <= 9) return 'linear-gradient(to bottom, #299a0b 0%,#299a0b 100%)';
            else return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';

        }
    }

    // const app = new BooksList(element);














}

