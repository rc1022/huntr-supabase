require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'huntr-supabase.vercel.app'
]

app.use(cors({ allowedOrigins, credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const jobsRoute = require('./routes/jobsRoutes');
app.use('/api/huntr', jobsRoute);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})