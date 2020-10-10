const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const User = require('./User');


const reservationSchema = new mongoose.Schema({

    start_date: {
        type: Date,
        required: true
    },

    end_date: {
        type: Date,
        required: true
    },

    // utente che ha prenotato
    user: {
        type: User,
        required: true
    },

    qrcode: {
        type: String,
        required: true
    }

});

reservationSchema.plugin(AutoIncrement,  {inc_field: 'reservationID'});

module.exports = reservationSchema;
//module.exports = mongoose.model('Reservation', reservationSchema);