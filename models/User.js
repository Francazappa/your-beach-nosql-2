const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        min: 4,
        max: 128,
        required: true
    },

    password: {
        type: String,
        min: 8,
        max: 512,
        required: true
    },

    name: {
        type: String,
        min: 3,
        max: 24,
        required: true
    },

    lastname: {
        type: String,
        min: 3,
        max: 24,
        required: true
      },

    province: {
        type: String,
        min: 3,
        max: 24,
        required: true
      },

    birthday: String,

    isValidated: {
        type: Boolean,
        default: false
    },

    registerDate: {
        type: Date,
        default: Date.now
    }

});

userSchema.plugin(AutoIncrement,  {inc_field: 'userID'});

module.exports = userSchema;
module.exports = mongoose.model('User', userSchema);