const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db/connection');

const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User registered successfully' });
        }
    );
};

const login = (req, res) => {
    const { email, password } = req.body;

    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, results) => {
            if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
        }
    );
};

module.exports = { register, login };
