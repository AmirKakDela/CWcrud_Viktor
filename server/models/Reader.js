const {Schema, model} = require('mongoose');

const Reader = new Schema({
    firstName: {type: String, required: true, minLength: 2},
    lastName: {type: String, required: true, minLength: 2},
    tel: {type: Number, required: true, minLength: 10, maxlength: 10}
})

module.exports = model('Reader', Reader);