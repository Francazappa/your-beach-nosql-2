const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/User');


class UserController {

    constructor(){}
    

    async getAllUsers(){

        try{
            const users = await User.find();
            return [200, users];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get all users'];
        }
    
    }
    

    async getUser(id){
    
        const user = await User.findOne({userID: id});
        if( ! user) return [404, 'ERROR: user [' + id + '] not found'];

        try{
            return [200, user];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get user'];
        }

    }


    async createNewUser(data){

        const emailExists = await User.findOne({email: data.email});
        if(emailExists) return [500, { status: "error", message: "utente " + data.name + " gia' registrato." }];
        
        const salt = await bcrypt.genSalt(12);
        const hashedPassword  = await bcrypt.hash(data.password, salt);

        const user = new User({

            email: data.email,
            password: hashedPassword,
            name: data.name,
            lastname: data.lastname,
            province: data.province ? data.province : null,
            birthday: data.birthday ? new Date(data.birthday) : null, // formato data -> "anno-mese-giorno" | ex: "1997-12-28"
            isValidated: true

        });

        try{

            const newUser = await user.save();
            return [200, { status: "success", message: "utente " + newUser.name + " registrato con successo." }];

        }catch(err){

            console.log("err: " + err);
            if( ! nerUser) return [500, { status: "error", message: "Impossibile creare nuovo utente." }];

        }

    }


    async deleteUser(id){
    
        const user = await User.findOne({userID: id});
        if( ! user) return [404, 'ERROR: user [' + id + '] not found'];
    
        try{
            user.delete();
            return [200, 'SUCCESS: deleted user with id [' + id + ']'];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t delete user']
        }
    
    }


    async deleteAllUsers(){
    
        try{
            mongoose.connection.db.dropCollection('users');
            return [200, 'SUCCESS: user collection deleted'];
        }catch(err){
            return [500, 'SERVER ERROR: couldn\'t drop user collection'];
        }
    
    }

}


module.exports = UserController;