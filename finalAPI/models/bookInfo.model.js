var mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    BookId: {
        type: Number
    },
    Isbn: {
        type: String
    },
    Description: {
        type: String
    },
    Title: {
        type: String
    },
    BookBlob: {
        type: String
    },
    Author: {
        type: String
    },
    ThumbNail: {
        type: String
    },
    SubTitle: {
        type: String
    },
    CreatedBy: {
        type: String
    },
    UpdatedBy: {
        type: String
    }
});

const books = mongoose.model('Books', bookSchema, 'Books');
module.exports = books;