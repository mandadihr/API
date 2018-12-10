var mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    _id: {
        type: String
    },
    sequence_value: {
        type: Number
    }
});

const counter = mongoose.model('Counters', counterSchema, 'Counters');
module.exports = counter;