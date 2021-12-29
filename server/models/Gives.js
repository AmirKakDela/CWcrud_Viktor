const {Schema, model, Types} = require('mongoose');

const Gives = new Schema({
    book: {type: Types.ObjectId, ref: 'Book', required: true},
    dateGive: {type: String, required: true},
    dateReturn: {type: String, required: true},
    reader: {type: Types.ObjectId, ref: 'Reader', required: true}
})

module.exports = model('Gives', Gives);