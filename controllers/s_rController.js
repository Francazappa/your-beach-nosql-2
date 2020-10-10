const mongoose = require('mongoose');

const Lido = require('../models/Lido');
const User = require('../models/User');
const Seat = require('../models/Seat');
const Reservation = require('../models/Reservation');
const S_r = require('../models/S_r');


class s_rController {

    constructor(){}


    async getAllReservations(lido){

        /**
         * 
         * TODO izzi
         * 
         */

    }


    async getUserReservation(lido, userID){

        /**
         * 
         * TODO izzi
         * 
         */

    }


    async getSpecificDayReservations(lido, date){

        /**
         * 
         * TODO
         * 
         */

    }


    async getSpecificDayLocationReservation(lido, date, location){

        /**
         * 
         * TODO
         * 
         * location è la {row e la column} inviata dal front end che identifica l'ombrellone
         * 
         */

    }

}


module.exports = s_rController;