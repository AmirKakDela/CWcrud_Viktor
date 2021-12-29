const {Schema, model} = require('mongoose');

const Gives = new Schema({
    book: {type: String, ref: 'Book', required: true},
    dateGive: {type: String, required: true},
    dateReturn: {type: String, required: true},
    reader: {type: String, ref: 'Reader', required: true}
})

module.exports = model('Gives', Gives);