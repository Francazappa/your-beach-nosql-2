const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const seatSchema = new mongoose.Schema({

    row:{
        type: String,
        required: true
    },
    
    column:{
        type: Number,
        required: true
    }

});

seatSchema.plugin(AutoIncrement,  {inc_field: 'id'});


module.exports = mongoose.model('Seat', seatSchema);