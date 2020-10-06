const router = require('express').Router();

const AdminController = require('../controllers/AdminController');
const adminController = new AdminController();


// routes per gli amministratori o i proprietari dei lidi (!= routes auth degli utenti normali)


// get tutti admin
router.get('/', async (req, res) => {

    var result = await adminController.getAllAdmins();
    res.status(result[0]).json(result[1]);

});


// get admin specifico tramite id
router.get('/:id', async (req, res) => {

    var result = await adminController.getAdmin(req.params.id);
    res.status(result[0]).json(result[1]);

});


// delete admin specifico
router.delete('/:id', async (req, res) => {

    var result = await adminController.deleteAdmin(req.params.id);
    res.status(result[0]).json(result[1]);

});


// drop tabella admin
router.delete('/', async (req, res) => {

    var result = await adminController.deleteAllAdmins();
    res.status(result[0]).json(result[1]);

});


module.exports = router;