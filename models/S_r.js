const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const s_rSchema = new mongoose.Schema({

    // inserire gli schemi degli altri model ???

    /*
    Seat.hasMany(Seat_Reservation);
    Reservation.hasMany(Seat_Reservation);
    Seat_Reservation.belongsTo(Seat);
    Seat_Reservation.belongsTo(Reservation);
    */

});

s_rSchema.plugin(AutoIncrement,  {inc_field: 'id'});

// metodi (perché stanno qui, non dovrebbero stare nel controller?)

//findCurrentReservations(lido) ???
//findUserReservations(userId) ???

module.exports = mongoose.model('S_r', s_rSchema);