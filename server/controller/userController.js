const supabase = require('../src/supabaseClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'fallback-access-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'fallback-refresh-secret';

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
        const { data: existingUser, error: existError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);

        if (existError) {
            return res.status(500).json({ message: 'Error checking user', error: existError.message });
        }
        if (existingUser && existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error: insertError } = await supabase
            .from('users')
            .insert([{ email, password_hash: hashedPassword }])
            .select();

        if (insertError) {
            return res.status(500).json({ message: 'Error creating user', error: insertError.message });
        }
        const newUser = data && data[0];
        if (!newUser) {
            return res.status(500).json({ message: 'Failed to retrieve new user after insert.' });
        }
        res.status(201).json({
            message: 'User created successfully!',
            user: { id: newUser.id, email: newUser.email }
        });

    } catch (error) {
        console.error('Signup error:',error)
        res.status(500).json({message:'Internal server error'});
    }
}

exports.login = async ( req, res ) => {
    try {
        const { email, password } = req.body;

        const { data: users, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);
        
        if (userError) {
            return res.status(500).json({ message: 'Error fetching user', error: userError.message });
        }

        if (!users || users.length === 0) {
            console.log('No user found for email: ', email)
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        console.log('Comparing password:', password, 'with hash:', user.password_hash);
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '15d' }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 24 * 60 * 60 * 1000
        });

        res.json({
            accessToken,
            user: { id: user.id, email: user.email }
        });

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