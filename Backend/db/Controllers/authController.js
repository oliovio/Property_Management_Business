const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../connection'); // Fixed path

// Register a new user
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        connection.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role],
            (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ error: 'Email already exists' });
                    }
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'User registered successfully' });
            }
        );
    } catch (err) {
        console.error('Error in register:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// User login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Query the database for the user
        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // Check if the user exists
                if (results.length === 0) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }

                const user = results[0];

                // Compare provided password with hashed password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }

                // Generate a JWT token
                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                // Send the token and user details
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                    },
                });
            }
        );
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { register, login };
