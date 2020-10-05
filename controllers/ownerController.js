const Owner = require('../models/Owner');
const mongoose = require('mongoose');

class ownerController {

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
    
        const owner = await Owner.findOne({id: id});
        if( ! owner) return [404, 'ERROR: owner [' + id + '] not found'];

        try{
            return [200, owner];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get owner'];
        }

    }


    async deleteOwner(id){
    
        const owner = await Owner.findOne({id: id});
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


module.exports = ownerController;