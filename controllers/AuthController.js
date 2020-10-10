const mongoose = require('mongoose');

const Admin = require('../models/Admin');
const Owner = require('../models/Owner');

const OwnerController = require('./OwnerController');
const ownercontroller = new OwnerController();

const AdminController = require('./AdminController');
const admincontroller = new AdminController();

class AuthController {

    constructor(){}

    
    async ownerLogin(data){

        /**
         * 
         * login per il proprietario
         * 
         * res.send authToken -> Authorization
         * 
         */

    }

    async adminLogin(data){

        /**
         * 
         * login per l'admin
         * 
         * res.send authToken + role? -> Authorization
         * 
         */

    }

    async userLogin(data){

        /**
         * 
         * login per utente
         * 
         * res.send authToken -> Authorization
         * 
         */

    }


    createTokenLogin = (id, email) => {

        return jwt.sign(
            {email: email, userId: id.toString()},
            process.env.TOKEN_SECRET,
            {expiresIn: '1h'}
        );
            
    };


}


module.exports = AuthController;