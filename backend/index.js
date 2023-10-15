const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnect');
const mongoose = require('mongoose');
require('dotenv').config()


console.log(process.env.NODE_ENV);
connectDB();

app.use(cors(corsOptions));
app.use(express.json()); // middleware to parse json
app.use(cookieParser());

app.use('/', require('./routes/root'));
app.use('/test', require('./routes/root'));


app.use('/api', require('./routes/userRoutes'));

app.use('/api/profiles', require('./routes/profileRoutes'));

app.use('/api/articles', require('./routes/articleRoutes'));

app.use('/api/tags', require('./routes/tagRoutes'));

app.use('/api/articles', require('./routes/commentRoutes'));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})

module.exports = app;