const {Schema, model} = require('mongoose');

const Reader = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    tel: {type: String, required: true}
})

module.exports = model('Reader', Reader);