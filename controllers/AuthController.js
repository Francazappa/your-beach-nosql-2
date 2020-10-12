const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Admin = require('../models/Admin');
const Owner = require('../models/Owner');


/**
 * 
 * contiene tutti i metodi per effettuare i login
 * e restituire i token di conseguenza
 * 
 */
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


    // login utente app android
    async userLogin(data){

        // CONTROLLO UTENTE GIA' REGISTRATO: controlla se l'username è nel db
        const user = await User.findOne({email: data.email});
        if( ! user) return [400, { status: "error", message: "wrong username or password" }];
            
        // CONTROLO PASSWORD: compara la pw nel body con quella cripatata nel db tramite bcrypt
        const validPass = await bcrypt.compare(data.password, user.password);
        if( ! validPass) return [400, { status: "error", message: "wrong username or password" }];
            
        // CREAZIONE E ASSEGNAZIONE JWT: se l'utente è in possesso del token può fare azioni -> private routes middlewares
        const token = createTokenLogin(user.userID, user.email);

        let toDeviceTemp = {
            status: "success",
            message: "",
            jwt: token,
            userId: user.userID.toString(),
            name: user.name,
            email: user.email,
            lastname: user.lastname,
            birthday: user.birthday,
            province: user.province
        };

        return [200, toDeviceTemp]; 

    }

}


function createTokenLogin (id, email) {

    return jwt.sign(
        {userID: id.toString(), email: email},
        process.env.TOKEN_SECRET,
        {expiresIn: '1h'}
    );
        
};


module.exports = AuthController;