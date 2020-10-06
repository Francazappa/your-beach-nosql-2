const router = require('express').Router();


//const { registerValidation, loginValidation } = require('../functions/validation');

const AdminAuthController = require('../controllers/AdminAuthController');
const adminAuthController = new AdminAuthController();


// routes per gli amministratori o i proprietari dei lidi (!= rotte auth degli utenti normali)


// registrazione admin
router.post('/adminRegister', async (req, res) => {

    // REGISTER VALIDATION: controlla se vengono rispettati i criteri definiti con joi in validation.js
    //const { error } = registerValidation(req.body);
    //if(error) return res.status(400).send(error.details[0].message);

    var result = await adminAuthController.adminRegister(req.body);
    res.status(result[0]).send(result[1]);

});


// registrazione proprietario | DIVIDERE IN 2 PARTI !!!
router.post('/ownerRegister', async (req, res) => {

    // REGISTER VALIDATION: controlla se vengono rispettati i criteri definiti con joi in validation.js
    //const { error } = registerValidation(req.body);
    //if(error) return res.status(400).send(error.details[0].message);

    var result = await adminAuthController.ownerRegister(req.body);
    res.status(result[0]).send(result[1]);

});


// login (sia per admin che per proprietario)
router.post('/login', async (req, res) => {

    // LOGIN VALIDATION
    //const { error } = loginValidation(req.body);
    //if(error) return res.status(400).send(error.details[0].message);

    var result = await adminAuthController.login(req.body);
    res.status(result[0]).header('auth-token', result[1]).json( { "token": result[1], "user": result[2] } );

});






// general route example ====================================================================================

router.get('/:id', verifyToken, isAdmin, async (req, res) => {

    var result = await controller.method(req.params.id);
    res.status(result[0]).json(result[1]);

});

//===========================================================================================================


module.exports = router;