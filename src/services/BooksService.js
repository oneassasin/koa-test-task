const debug = require('debug');

const log = debug('test:BooksService');

class BooksService {
    /**
     * @type {MySqlService}
     */
    mySqlService = null;

    constructor({mySqlService}) {
        this.mySqlService = mySqlService;
    }

    /**
     * @param limit {number}
     * @param offset {number}
     * @param sortBy {string}
     * @param sortType {string}
     * @returns {Promise<*[]>}
     */
    async getBooks(limit = 10,
                   offset = 0,
                   sortBy = 'date',
                   sortType = 'ASC') {

        const connection = await this.mySqlService.getConnection();

        let data = null;

        try {
            data = await connection.query(`
                        SELECT *
                        FROM books
                        ORDER BY ? ${sortType}
                        LIMIT ?
                        OFFSET ?
                `,
                [sortBy, limit, offset],
            );
        } catch (err) {
            log('Error with get books', err);
            throw new Error('Database query error');
        } finally {
            this.mySqlService.releaseConnection(connection).catch(err => {
                log('Error with release connection', err);
            });
        }

        return data;
    }

    /**
     * @param bookModel {Object}
     * @returns {Promise<Object>}
     */
    async createBook(bookModel) {
        // TODO: Insert into DB
        return Promise.resolve(bookModel);
    }

    /**
     * @param id {Number}
     * @param bookModel <Object>
     * @returns {Promise<Object>}
     */
    async updateBook(id, bookModel) {
        const fields = Object.keys(bookModel);
        // TODO: Update fields in DB
        return Promise.resolve(bookModel);
    }
}

module.exports = BooksService;
