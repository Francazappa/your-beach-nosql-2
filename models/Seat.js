const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Lido = require('./Lido');


const seatSchema = new mongoose.Schema({

    row: {
        type: String,
        required: true
    },
    
    column: {
        type: Number,
        required: true
    },

    lido: {
        type: Lido,
        required:true
    }

});

seatSchema.plugin(AutoIncrement,  {inc_field: 'seatID'});

module.exports = seatSchema;
//module.exports = mongoose.model('Seat', seatSchema);