require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./src/db')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

pool.getConnection()
.then( connection => {
    console.log("Database pool connected");
    connection.release();
})
.catch( err => {
    console.error('Error connecting to the database', err.stack);
})

const jobsRoute = require('./routes/jobsRoutes');
app.use('/api/huntr', jobsRoute);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    
})