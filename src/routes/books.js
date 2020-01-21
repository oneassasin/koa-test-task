import {GET, POST, PUT, route} from "awilix-router-core";

@route('/books')
export default class BooksAPI {
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
        return await this.booksService.getBooks(ctx.query.limit, ctx.query.offset);
    }

    @POST()
    async createBook(ctx) {
        // TODO: Validate and sanitize data in body
        return await this.booksService.createBook(ctx.body);
    }

    @route('/:id')
    @PUT()
    async updateBook(ctx) {
        // TODO: Validate and sanitize data in body and route param
        return await this.booksService.updateBook(ctx.params.id, ctx.body);
    }
}
