const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://admin:admin@cluster0.3bb63do.mongodb.net/?retryWrites=true&w=majority`, () => {
    console.log('Successfully connected to db')
})
