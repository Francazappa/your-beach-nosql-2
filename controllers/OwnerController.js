const mongoose = require('mongoose');
const Owner = require('../models/Owner');
const bcrypt = require('bcryptjs');

class OwnerController {

    constructor(){}
    
    
    async getAllOwners(){

        try{
            const owners = await Owner.find();
            return [200, owners];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get all owners'];
        }
    
    }
    

    async getOwner(id){
    
        const owner = await Owner.findOne({ownerID: id});
        if( ! owner) return [404, 'ERROR: owner [' + id + '] not found'];

        try{
            return [200, owner];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get owner'];
        }

    }


    async createNewOwner(data){

        const salt = await bcrypt.genSalt(12);
        const hashedPassword  = await bcrypt.hash(data.password, salt); // hashing pw with salt

        const owner = new Owner({

            email: data.email,
            password: hashedPassword,
            name: data.name,
            lastname: data.lastname,
            province: data.province,
            birthday: data.birthday,
            isValidated: data.isValidated,
            isAdmin: data.isAdmin,
            isOwner: data.isOwner,
            fiscalCode: data.fiscalCode,
            vatNumber: data.vatNumber,
            ownedLidos: data.ownerLidos

        });

        const newOwner = await owner.save();
        if( ! newOwner) return [500, 'SERVER ERROR: couldn\'t create new owner'];
    
        return [200, 'SUCCESS: owner [' + newOwner.name + '] corretly created'];

    }


    async deleteOwner(id){
    
        const owner = await Owner.findOne({ownerID: id});
        if( ! owner) return [404, 'ERROR: owner [' + id + '] not found'];
    
        try{
            owner.delete();
            return [200, 'SUCCESS: deleted owner with id [' + id + ']'];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t delete owner']
        }
    
    }

    
    async deleteAllOwners(){
    
        try{
            mongoose.connection.db.dropCollection('owners');
            return [200, 'SUCCESS: owners collection deleted'];
        }catch(err){
            return [500, 'SERVER ERROR: couldn\'t drop owners collection'];
        }
    
    }

}


module.exports = OwnerController;