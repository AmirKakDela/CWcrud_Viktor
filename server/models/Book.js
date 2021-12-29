const {Schema, model} = require('mongoose');

const Book = new Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number, required: false},
    count: {type: Number, required: true}
})

module.exports = model('Book', Book);