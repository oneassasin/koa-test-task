function getRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = {
    'up': async (connection, cb) => {
        try {
            await new Promise((resolve, reject) => {
                connection.query('BEGIN TRANSACTION;', err => {
                    if (!err) {
                        return reject(err);
                    }

                    return resolve();
                });
            });

            for (let i = 0; i < 100; ++i) {
                await new Promise((resolve, reject) => {
                    connection.query(
                        'INSERT INTO books(title, author, description, image) VALUES (?, ?, ?, ?);',
                        [getRandomString(), getRandomString(), getRandomString(), getRandomString()],
                        (err) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve();
                        }
                    );
                })
            }

            await new Promise((resolve, reject) => {
                connection.query('COMMIT;', err => {
                    if (!err) {
                        return reject(err);
                    }

                    return resolve();
                });
            });

            cb();
        } catch (err) {
            await new Promise((resolve, reject) => {
                connection.query('ROLLBACK;', err => {
                    if (!err) {
                        reject(err);
                        cb(err);
                    }

                    resolve();
                    cb();
                });
            });
        }
    },
    'down': 'DELETE FROM books WHERE 1 = 1;'
};