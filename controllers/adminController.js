const Admin = require('../models/Admin');
const mongoose = require('mongoose');

class adminController {

    constructor(){}
    

    // get tutti gli admin
    async getAllAdmins(){

        try{
            const admins = await Admin.find();
            return [200, admins];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get all admins'];
        }
    
    }
    

    // get admin specifico
    async getAdmin(id){
    
        const admin = await Admin.findOne({id: id});
        if( ! admin) return [404, 'ERROR: admin [' + id + '] not found'];

        try{
            return [200, admin];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get admin'];
        }

    }


    // delete admin specifico
    async deleteAdmin(id){
    
        const admin = await Admin.findOne({id: id});
        if( ! admin) return [404, 'ERROR: admin [' + id + '] not found'];
    
        try{
            admin.delete();
            return [200, 'SUCCESS: deleted admin with id [' + id + ']'];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t delete admin']
        }
    
    }

    // drop tabella admin
    async deleteAllAdmins(){
    
        try{
            mongoose.connection.db.dropCollection('admins');
            return [200, 'SUCCESS: admin collection deleted'];
        }catch(err){
            return [500, 'SERVER ERROR: couldn\'t drop admin collection'];
        }
    
    }

}


module.exports = adminController;