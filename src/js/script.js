/* eslint-disable indent */



/* eslint-disable no-unused-vars */
{
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


    function render() {

        for (let elem of dataSource.books) {
            const generatedHTML = templates.books(elem);

            const elementDOM = utils.createDOMFromHTML(generatedHTML);

            const booksList = document.querySelector(select.booksList);

            booksList.appendChild(elementDOM);

        }
    }





    function initActions() {

        const booksList = document.querySelector(select.booksList);
        booksList.addEventListener('dblclick', function (event) {
            event.preventDefault();
            const img = event.target.offsetParent;
            const bookId = img.getAttribute('data-id');

            if (img.classList.contains('book__image')) {

                if (favoriteBooks.includes(bookId)) {
                    img.classList.remove('favorite');
                    const index = favoriteBooks.indexOf(bookId);
                    favoriteBooks.splice(index, 1);
                } else {
                    img.classList.add('favorite');

                    favoriteBooks.push(bookId);
                }
            }
            filterBooks();
        });

        const filtersForm = document.querySelector(select.filtersForm);

        filtersForm.addEventListener('click', function (callback) {
            if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
                console.log(event.target.value);
            }
            if (event.target.checked == true) {
                filters.push(event.target.value);
            } else {
                const index = filters.indexOf(event.target.value);
                filters.splice(index, 1);
            }
        });

    }

    function filterBooks() {
        for (let book of dataSource.books) {
            let shouldBeHidden = false;
            for (let filter of filters) {
                if (!book.details[filter]) {
                    shouldBeHidden = true;
                    break;
                }
            }

            const toHiddeBook = document.querySelectorAll(select.bookImage[data-id="dataSource.books.id"]);
            console.log(toHiddeBook);

            if (shouldBeHidden == true) {
                toHiddeBook.classList.add('hidden');
            } else {
                toHiddeBook.classList.remove('hidden');
            }

        }

    }
    const favoriteBooks = [];
    console.log(favoriteBooks);
    const filters = [];
    console.log(filters);

    render();
    initActions();

}

