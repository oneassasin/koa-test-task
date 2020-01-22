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

        try {
            return await connection.query(`
                        SELECT *
                        FROM books
                        ORDER BY ? ${connection.escape(sortType)}
                        LIMIT ?, ?
                `,
                [sortBy, sortType, limit, offset],
            );
        } catch (err) {
            throw new Error('Database query error');
        }
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
