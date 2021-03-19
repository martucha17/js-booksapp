/* eslint-disable indent */



/* eslint-disable no-unused-vars */
{
    const select = {
        books: '#template-book',
        booksList: '.books-list',
    };

    const templates = {
        books: Handlebars.compile(document.querySelector(select.books).innerHTML)
    };


    function render() {
        for (let elem of dataSource.books) {
            const generatedHTML = templates.books(dataSource.books);
            console.log(generatedHTML);

            const elementDOM = utils.createDOMFromHTML(generatedHTML);
            console.log(elementDOM);

            const booksContainer = document.querySelector(select.booksList);

            booksContainer.appendChild(elementDOM);

        }
    }

    render();


}


