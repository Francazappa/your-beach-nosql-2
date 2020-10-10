const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Reservation = require('./Reservation');
const Seat = require('./Seat');

/*
l'incrocio dei seats e delle reservation avverrà nel controller in s_rController perché qui è evitabile.
questa entità serve solo per tenere traccia a livello formale a db delle prenotazioni di lettino xy in data x
buonasera popolo di striscia
*/

/**
* 
*
* let data = new Reservation({
* 
*      start_date: req.body.start_date,
*      end_date: req.body.end_date
* 
* });
* 
* let ombrellone =  new Seat({
* 
*      row: req.body.row,
*      column: req.body.column
* 
* });
* 
* 
* 
* const s_r = new S_r({
*
*      tizioCheHaPrenotato: tizio,
*      reservationDate: data,
*      seatLocation: ombrellone
* 
* });
* 
* await s_r.save();
*
*/

const s_rSchema = new mongoose.Schema({

    reservationDate: {
        type: Reservation, // accedo a user id tramite reservation
        required: true
    },

    seatLocation: {
        type: Seat,
        required: true
    }

});

s_rSchema.plugin(AutoIncrement,  {inc_field: 's_rID'});


module.exports = mongoose.model('S_r', s_rSchema);