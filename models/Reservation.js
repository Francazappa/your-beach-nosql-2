const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const reservationSchema = new mongoose.Schema({

    start_date: {
        type: Date,
        required: true
    },

    end_date:{
        type: Date,
        required: true
    },

    qrcode: {
        type: String,
        required: true
    }

});

reservationSchema.plugin(AutoIncrement,  {inc_field: 'reservationID'});


module.exports = mongoose.model('Reservation', reservationSchema);