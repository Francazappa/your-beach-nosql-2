const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const lidoSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    description: String,

    address: String,

    long: Number,

    lat: Number,

    openingMonth: {
        type: Number,
        min: 1,
        max: 12,
        default: 1
    },

    closingMonth: {
        type: Number,
        min: 1,
        max: 12,
        default: 12
    },

    allowDog: {
        type: Boolean,
        default: false
    },

    hasBar: {
        type: Boolean,
        default: false
    },

    hasRestaurant: {
        type: Boolean,
        default: false
    },

    hasLifeguard: {
        type: Boolean,
        default: false
    },

    hasDisabledServices: {
        type: Boolean,
        default: false
    },

    hasPlayground: {
        type: Boolean,
        default: false
    },

    hasWiFi: {
        type: Boolean,
        default: false
    },

    thumbnail: String

});

lidoSchema.plugin(AutoIncrement,  {inc_field: 'lidoID'});

module.exports = lidoSchema;
module.exports = mongoose.model('Lido', lidoSchema);