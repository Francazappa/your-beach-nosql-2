const Lido = require('../models/Lido');
const mongoose = require('mongoose');


// si lo so che lidos è sbagliatissimo non rompete


class lidoController {

    constructor(){}
    

    async getAllLidos(){

        try{
            const lidos = await Lido.find();
            return [200, lidos];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get all lidos'];
        }
    
    }
    

    async getLido(id){
    
        const lido = await Lido.findOne({id: id});
        if( ! lido) return [404, 'ERROR: lido [' + id + '] not found'];

        try{
            return [200, lido];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get lido'];
        }

    }


    async createNewLido(data){

        // data contiene il json da scrivere su db

    }


    async updateLido(data){

        // data contiene il json con i singoli campi da aggiornare/riscrivere riguardo un singolo lido

    }


    async deleteLido(id){
    
        const lido = await Lido.findOne({id: id});
        if( ! lido) return [404, 'ERROR: lido [' + id + '] not found'];
    
        try{
            lido.delete();
            return [200, 'SUCCESS: deleted lido with id [' + id + ']'];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t delete lido']
        }
    
    }


    async deleteAllLidos(){
    
        try{
            mongoose.connection.db.dropCollection('lidos');
            return [200, 'SUCCESS: lido collection deleted'];
        }catch(err){
            return [500, 'SERVER ERROR: couldn\'t drop lido collection'];
        }
    
    }

}


module.exports = lidoController;