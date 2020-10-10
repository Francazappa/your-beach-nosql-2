const router = require('express').Router();

// IMPLEMENTA
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const isOwner = require('../middlewares/isOwner');

const OwnerController = require('../controllers/OwnerController');
const ownercontroller = new OwnerController();


// get tutti owner
router.get('/', async (req, res) => {

    var result = await ownercontroller.getAllOwners();
    res.status(result[0]).json(result[1]);

});


// get owner specifico tramite id
router.get('/:id', async (req, res) => {

    var result = await ownercontroller.getOwner(req.params.id);
    res.status(result[0]).json(result[1]);

});


// da spostare o eliminare
router.post('/', async (req, res) => {

    var result = await ownercontroller.createNewOwner(req.body);
    res.status(result[0]).json(result[1]);

});


// delete owner specifico
router.delete('/:id', async (req, res) => {

    var result = await ownercontroller.deleteOwner(req.params.id);
    res.status(result[0]).json(result[1]);

});


// drop tabella owner
router.delete('/', async (req, res) => {

    var result = await ownercontroller.deleteAllOwners();
    res.status(result[0]).json(result[1]);

});


module.exports = router;