const router = require('express').Router();
const User = require('../models/User');

//const { body } = require('express-validator/check');
const { body } = require('express-validator');

const AdminController = require('../controllers/AdminController');
const admincontroller = new AdminController();

const OwnerController = require('../controllers/OwnerController');
const ownercontroller = new OwnerController();

const LidoController = require('../controllers/LidoController');
const lidocontroller = new LidoController();

const AuthController = require('../controllers/AuthController');
const authcontroller = new AuthController();

const UserController = require('../controllers/UserController');
const usercontroller = new UserController();



// registrazione admin
router.post('/adminRegister', async (req, res) => {

    var result = await admincontroller.createNewAdmin(req.body);
    res.status(result[0]).json(result[1]);

});


/**
 * registrazione proprietario e lido (contemporaneamente)
 * 
 * il req.body in arrivo dal frontend di amministrazione contiene due json: owner e lido.
 * 
 * req.body.owner contiene tutti i dati per la registrazione del proprietario
 * req.body.lido contiene tutti i dati per la registrazione di un nuovo lido
 * 
 * ha senso fare tutto con una chiamata nel backend? o è meglio 2 chiamate dal frontend?
 * 
 */
router.post('/ownerRegister', async (req, res) => {

    try{

        let owner = await ownercontroller.createNewOwner(req.body.owner);
        res.status(owner[0]).json(owner[1]);

        let lido = await lidocontroller.createNewLido(req.body.lido);
        res.status(lido[0]).json(lido[1]);

    }catch(err){

        res.status(500).json("SERVER ERROR: couldn\'t create register new owner and his lido");

    }

});


// login sia per admin sia per proprietario | rinomina l'endpoint per favore
router.post('/adminOwnerLogin', async (req, res) => {

    /**
     * 
     * TODO
     * 
     */

});


/**
 * endpoint per la registrazione di un nuovo utente dall'app android
 * 
 * il frontend da telefono invia un json "fromDevice" con tutti i dati necessari
 * il backend rosponde con un json "toDevice"
 * 
 * I CONTROLLI SULLA CORRETTEZZA DELLA SINSTASSI SONO EFFETTUATI ANCHE SUL FRONTEND
 * 
 * funziona ma non c'è l'errore fatto bene come quello di mattia
 * -> emula con joi e via
*/
router.post('/signup', async(req, res) => {

    var result = await usercontroller.createNewUser(req.body.fromDevice);
    res.status(result[0]).json({toDevice: result[1]});

});



/**
 * endpoint per il login di un utente dall'app android
 * 
 * funziona ma non c'è l'errore fatto bene come quello di mattia
 * -> emula con joi e via
 */
router.post('/login', async(req, res) => {

    var result = await authcontroller.userLogin(req.body.fromDevice);
    res.status(result[0]).json({toDevice: result[1]});

});


module.exports = router;