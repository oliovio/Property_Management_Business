const connection = require('../db/connection');

const createUser = (username, email, hashedPassword, role, callback) => {
    const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, email, hashedPassword, role], callback);
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], callback);
};

module.exports = {
    createUser,
    findUserByEmail,
};
