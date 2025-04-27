const pool = require('../src/db');
const bcrypt = require('bcrypt');

exports.register = async ( req, res ) => {
    
    const { email, password } = req.body;

    try {
        const [ exisitingUser ] = await pool.query(
            'SELECT * FROM users WHERE email = ?', [email]
        )

        if (exisitingUser > 0) {
            return res.status(400).json({message: 'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (email, password) VALUES (?, ?)'
            , [ email, hashedPassword]);
        res.status(201).json({message: 'User created successfully!'})

    } catch (error) {
        console.error('Signup error:',error)
        res.status(500).json({message:'Internal server error'});
    }
}

exports.login = async ( req, res ) => {

}