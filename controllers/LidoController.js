const Lido = require('../models/Lido');
const mongoose = require('mongoose');


// si lo so che lidos è sbagliatissimo non rompete


class LidoController {

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
    
        const lido = await Lido.findOne({lidoID: id});
        if( ! lido) return [404, 'ERROR: lido [' + id + '] not found'];

        try{
            return [200, lido];
        }catch{
            return [500, 'SERVER ERROR: couldn\'t get lido'];
        }

    }


    async createNewLido(data){

        // data contiene il json da scrivere su db
        const lido = new Lido({

            name: data.name,
            description: data.description,
            address: data.address,
            long: data.long,
            lat: data.lat,
            openingMonth: data.openingMonthopeningMonth,
            closingMonth: data.closingMonth,
            allowDog: data.allowDog,
            hasBar: data.hasBar,
            hasRestourant: data.hasRestourant,
            hasLifeguard: data.hasLifeguard,
            hasDisabledServices: data.hasDisabledServices,
            hasPlayground: data.hasPlayground,
            hasWiFi: data.hasWiFi,
            thumbnail: data.thumbnail

        });

        const newLido = await lido.save();
        if( ! newLido) return [500, 'SERVER ERROR: couldn\'t create a new lido'];

    
        return [200, 'SUCCESS: correctly registered lido [' + newLido.name + '] with id [' + newLido.lidoID + ']'];

    }


    async updateLido(data){

        // data contiene il json con i singoli campi da aggiornare/riscrivere riguardo un singolo lido

    }


    async deleteLido(id){
    
        const lido = await Lido.findOne({lidoID: id});
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


module.exports = LidoController;