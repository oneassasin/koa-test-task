import {before} from "awilix-router-core";

const {GET, POST, PUT, route} = require('awilix-router-core');
const BookDVO = require('../entities/dvo/book');
const validate = require('koa-joi-validate');
const Joi = require('@hapi/joi');


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
    @before([validate({
        query: {
            limit: Joi.number().integer().min(1).max(100).optional(),
            offset: Joi.number().integer().min(1).max(100).optional(),
            sortBy: Joi.string().valid('title', 'date', 'author', 'description', 'image').optional(),
            sortType: Joi.string().valid('ASC', 'DESC').optional(),
        }
    })])
    async getBooks(ctx) {
        try {
            ctx.body = await this.booksService.getBooks(
                ctx.query.limit,
                ctx.query.offset,
                ctx.query.sortBy,
                ctx.query.sortType,
            );
        } catch (err) {
            ctx.body = err;
            ctx.status = 500;
        }
    }

    @POST()
    @before([validate({
        body: BookDVO,
    })])
    async createBook(ctx) {
        return await this.booksService.createBook(ctx.body);
    }

    @PUT()
    @route('/:id')
    @before([validate({
        params: {
            id: Joi.number().integer().required()
        },
        body: BookDVO,
    })])
    async updateBook(ctx) {
        return await this.booksService.updateBook(ctx.params.id, ctx.body);
    }
}

module.exports = BooksAPI;
