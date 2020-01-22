const {GET, POST, PUT, route} = require('awilix-router-core');
const BookDVO = require('../entities/dvo/book');

@route('/books')
class BooksAPI {
    /**
     * @type {BooksService}
     */
    booksService = null;

    constructor({booksService}) {
        this.booksService = booksService;
    }

    @GET()
    async getBooks(ctx) {
        // TODO: Parse and validate all params

        return await this.booksService.getBooks(
            ctx.query.limit,
            ctx.query.offset,
            ctx.query.sortBy,
            ctx.query.sortType,
        );
    }

    @POST()
    async createBook(ctx) {
        ctx.checkBody(BookDVO);
        const errors = ctx.validationErrors();

        if (errors) {
            ctx.body = errors;
            ctx.status = 400;
            return;
        }

        return await this.booksService.createBook(ctx.body);
    }

    @route('/:id')
    @PUT()
    async updateBook(ctx) {
        ctx.checkParams('id').notEmpty().isInt();

        ctx.checkBody(BookDVO);
        const errors = ctx.validationErrors();

        if (errors) {
            ctx.body = errors;
            ctx.status = 400;
            return;
        }

        return await this.booksService.updateBook(ctx.params.id, ctx.body);
    }
}

module.exports = BooksAPI;
