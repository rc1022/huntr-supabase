const pool = require('../src/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

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
    try {
        const { email, password } = req.body;

        const [ users ] = await pool.query('SELECT * from users WHERE email = ?', [email]);
            if (users.length === 0) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

        const user = users[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email},
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m'}
        );

        const refreshToken = jwt.sign(
            {id: user.id, email: user.email},
            REFRESH_TOKEN_SECRET,
            {expiresIn:'15d'}
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15*24*60*60*1000
        })

        res.json({
            accessToken,
            user: { id: user.id, email: user.email}
        })


    

    
    } catch (error) {
        console.error('Login Error', error);
        res.status(500).json({message:'Server error'})
    }

}

exports.refresh = async (req, res) => {

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({message:'No refresh token'});

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Invalid refresh token'});

        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        );
        res.json({accessToken})
    })
}