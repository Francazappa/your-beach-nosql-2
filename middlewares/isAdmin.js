const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function isAdmin(req, res, next){

    // rinominare auth-token? | loginToken magari?
    const decoded = jwt.decode(req.header('auth-token'), process.env.TOKEN_SECRET);
    const maybeAdmin = await User.findOne({userID: decoded.userID});

    req.decoded = decoded;

    if(maybeAdmin.isAdmin) next();
    else return res.status(401).send('UNATHORIZED: user [' + maybeAdmin.name + '] is not admin');

}


module.exports = isAdmin;