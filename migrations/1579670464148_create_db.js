module.exports = {
    'up': `
        CREATE TABLE books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            
            title TEXT NOT NULL,
            date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            author TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL
        );
    `,
    'down': 'DROP TABLE books;'
};
