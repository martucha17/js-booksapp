/* eslint-disable indent */



/* eslint-disable no-unused-vars */
{
    const select = {
        books: '#template-book',
        booksList: '.books-list',
        bookImage: '.book__image',
        bookId: '.data-id',
        favoriteBook: '.favorite',
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

    render();

    const favoriteBooks = [];
    console.log(favoriteBooks);

    function initActions() {

        const bookImage = document.querySelectorAll(select.bookImage);
        




        for (let img of bookImage) {
            img.addEventListener('dblclick', function (event) {
                event.preventDefault();
                const favoriteBook = document.querySelector(select.favoriteBook);
                console.log(favoriteBook);
                if (img == favoriteBook) {
                    img.classList.remove('favorite');
                    const index = favoriteBooks.indexOf();
                } else {
                    img.classList.add('favorite');
                    const bookId = img.getAttribute('data-id');
                    favoriteBooks.push(bookId);
                }

            });
        }
    }

    initActions();
}


