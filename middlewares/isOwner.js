const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');


async function isOwner(req, res, next){

    const decoded = jwt.decode(req.header('Authorization'), process.env.TOKEN_SECRET);
    const maybeOwner = await Owner.findOne({ownerID: decoded.id});

    req.decoded = decoded;

    if(maybeOwner.isOwner) next();
    else return res.status(401).send('UNATHORIZED: user [' + maybeOwner.name + '] is not an owner');

}


module.exports = isOwner;