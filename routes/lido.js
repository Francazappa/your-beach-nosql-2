const router = require('express').Router();

// IMPLEMENTA
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const isOwner = require('../middlewares/isOwner');

const LidoController = require('../controllers/LidoController');
const lidocontroller = new LidoController();


// rotte per i lidi


// getta tutti i lidi | OK
router.get('/', async (req, res) => {

    var result = await lidocontroller.getAllLidos();
    res.status(result[0]).json(result[1]);

});


// getta un lido specifico | OK | basic info per uomi
router.get('/:id', async (req, res) => {

    var result = await lidocontroller.getLido(req.params.id);
    res.status(result[0]).json(result[1]);

});

// ==========================================================================================
// crea un lido | da spostare in adminAuthController o no? | OK
router.post('/', async (req, res) => {
    
    var result = await lidocontroller.createNewLido(req.body);
    res.status(result[0]).json(result[1]);
    
});


// modifica/aggiorna attributi lido specifico | OK
/**
 * 
 * uomino qui nel body della chiamata metti solo 
 * i campi che vuoi aggiornare, tipo:
 * 
 * {
 * 
 *      allowdog: true,
 *      hasBar: false,
 *          .
 *          .
 *          .
 * 
 * }
 * 
 * e lo invii ez
 * 
 */
router.patch('/:id', async (req, res) => {
    
    var result = await lidocontroller.updateLido(req.params.id, req.body);
    res.status(result[0]).json(result[1]);
    
});
// ==========================================================================================


// elimina lido specifico | OK
router.delete('/:id', async (req, res) => {

    var result = await lidocontroller.deleteLido(req.params.id);
    res.status(result[0]).json(result[1]);

});

// drop tabella lidos | OK-
router.delete('/', async (req, res) => {

    var result = await lidocontroller.deleteAllLidos();
    res.status(result[0]).json(result[1]);

});


module.exports = router;