const router = require('express').Router();

const { body } = require('express-validator/check');

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


// IMPLEMENTARE ASSOLUTAMENTE IL CONTROLLO DELLA SINTASSI PRIMA DI OGNI CHIAMATA AI CONTROLLER !!!!!!!!!!!!!


// registrazione admin
router.post('/adminRegister', async (req, res) => {

    var result = await admincontroller.createNewAdmin(req.body);
    res.status(result[0]).json(result[1]);

});


// registrazione proprietario e lido
/**
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


// login (sia per admin che per proprietario)
router.post('/adminOwnerLogin', async (req, res) => {



});


/**
 * 
 * Login per l'utente dell'app android.
 * 
 * Di mattia, usa express validator per il controllo dell'input,
 * 
 * il frontend da telefono invia un json "fromDevice" con tutti i dati necessari
 * il backend rosponde con un json "toDevice"
 * 
 */
router.post('/signup', 
[
    body('fromDevice.email')
    .isEmail()
    .withMessage('Inserire un indirizzo email valido')
    .custom((value, { req }) => {
        return User.findOne({email: value}).then(user => {
            if (user) {
                return Promise.reject('Questo indirizzo email è gia stato registrato');
            }
        });
    })
    .normalizeEmail(),
    body('fromDevice.password').trim().isLength({min: 5}).withMessage("La password deve essere lunga almeno 5 caratteri"),
    body('fromDevice.name').trim().not().isEmpty().withMessage("Il nome non può essere vuoto"),
    body('fromDevice.lastname').trim().not().isEmpty().withMessage("Il cognome non può essere vuoto")
], usercontroller.userRegister);


/**
 * 
 * Di mattia
 * 
 */
router.post('/login',
[
    body('fromDevice.email')
    .isEmail()
    .withMessage('Inserire un indirizzo email valido')
    .normalizeEmail()
    .not().isEmpty(),
    body('fromDevice.password').trim().not().isEmpty()
], authcontroller.userLogin);


module.exports = router;