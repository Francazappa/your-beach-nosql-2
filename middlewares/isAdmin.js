const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');


async function isAdmin(req, res, next){

    const decoded = jwt.decode(req.header('Authorization'), process.env.TOKEN_SECRET);
    const maybeAdmin = await Admin.findOne({adminID: decoded.adminID}); // mmmm e se la chiamata la fa un user o un owner?

    req.decoded = decoded;

    if(maybeAdmin.isAdmin) next();
    else return res.status(401).send('UNATHORIZED: user [' + maybeAdmin.name + '] is not admin');

}


module.exports = isAdmin;