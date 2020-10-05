const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const isOwner = require('../middlewares/isOwner');

const LidoController = require('../controllers/lidoController');
const lidoContoller = new LidoController();


// rotte per i lidi


// getta tutti i lidi
router.get('/', verifyToken, isAdmin, async (req, res) => {

    var result = await lidoController.getAllLidos();
    res.status(result[0]).json(result[1]);

});


// getta un lido specifico
router.get('/:id', verifyToken, isAdmin, async (req, res) => {

    var result = await lidoController.getLido(req.params.id);
    res.status(result[0]).json(result[1]);

});


// crea un lido
router.post('/', verifyToken, isAdmin, isOwner, async (req, res) => {

    var result = await lidoController.createNewLido();
    res.status(result[0]).json(result[1]);

});


// modifica/aggiorna attributi lido specifico
router.patch('/:id'), verifyToken, isAdmin, async (req, res) => {

    var result = await lidoController.updateLido(id, req.newParams);
    res.status(result[0]).json(result[1]);

}


// elimina lido specifico
router.delete('/:id', verifyToken, isAdmin, isOwner, async (req, res) => {

    var result = await lidoController.deleteLido(req.params.id);
    res.status(result[0]).json(result[1]);

});


module.exports = router;