const mongoose = require('mongoose');
const Admin = require('../models/Admin');


class AdminController {

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
    
        const admin = await Admin.findOne({adminID: id});
        if( ! admin) return [404, 'ERROR: admin [' + id + '] not found'];

        try{
            return [200, admin];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get admin'];
        }

    }


    // crea nuovo admin
    async createNewAdmin(){

        const salt = await bcrypt.genSalt(12);
        const hashedPassword  = await bcrypt.hash(data.password, salt);

        const admin = new Admin({

            email: data.email,
            password: hashedPassword,
            name: data.name,
            lastname: data.lastname,
            province: data.province,
            birthday: data.birthday,
            isValidated: data.isValidated,
            isAdmin: data.isAdmin
            
        });

        const newAdmin = await admin.save();
        if( ! newAdmin) return [500, 'SERVER ERROR: couldn\'t create new admin'];
    
        return [200, 'SUCCESS: admin [' + newAdmin.name + '] corretly created'];

    }


    // delete admin specifico
    async deleteAdmin(id){
    
        const admin = await Admin.findOne({adminID: id});
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


module.exports = AdminController;