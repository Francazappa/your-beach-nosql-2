const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const adminSchema = new mongoose.Schema({

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
        default: true
    },

    registerDate: {
        type: Date,
        default: Date.now
    },
    

    // dati in più per il proprietario

    isOwner: {
        type: Boolean,
        default: false,
        required: true
    },

    codiceFiscale: {
        type: String,
        required: true
    },

    partitaIva: {
        type: String,
        required: true
    }


});

adminSchema.plugin(AutoIncrement,  {inc_field: 'id'});


module.exports = mongoose.model('Admin', adminSchema);