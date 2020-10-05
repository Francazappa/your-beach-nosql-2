const router = require('express').Router();

const ownerController = require('../controllers/ownerController');


// get tutti owner
router.get('/', async (req, res) => {

    var result = await ownerController.getAllOwners();
    res.status(result[0]).json(result[1]);

});


// get owner specifico tramite id
router.get('/:id', async (req, res) => {

    var result = await ownerController.getOwner(req.params.id);
    res.status(result[0]).json(result[1]);

});


// delete owner specifico
router.delete('/:id', async (req, res) => {

    var result = await ownerController.deleteOwner(req.params.id);
    res.status(result[0]).json(result[1]);

});


// drop tabella owner
router.delete('/', async (req, res) => {

    var result = await ownerdController.deleteAllOwners();
    res.status(result[0]).json(result[1]);

});


module.exports = router;