export default class BooksService {
    constructor({mySqlService}) {
        this.mySqlService = mySqlService;
    }

    /**
     * @param limit {number}
     * @param offset {number}
     * @returns {Promise<*[]>}
     */
    async getBooks(limit = 10, offset = 0) {
        // TODO: Select all books
        return Promise.resolve([]);
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
