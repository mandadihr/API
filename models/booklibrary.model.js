var mongoose = require('mongoose');

const bookLibSchema = mongoose.Schema({
    BookId: {
        type: Number
    },
    Title: {
        type: String
    },
    Isbn: {
        type: String
    },
    Description: {
        type: String
    },
    BookBlob: {
        type: String
    },
    Author: {
        type: String
    },
    LibraryName: {
        type: String
    },
    ThumbNail: {
        type: String
    },
    SubTitle: {
        type: String
    },
    UserId: {
        type: Number
    }
});

const libraries = mongoose.model('Libraries', bookLibSchema, 'Libraries');
module.exports = libraries;