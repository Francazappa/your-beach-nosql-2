const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');


console.log('\n' + '----- | YOUR BEACH\'S SERVER | -----' + '\n');


// middlewares
app.use(express.json());
app.use(cors());


// imported routes
//const ownerRoute = require('./routes/owner');
//const adminRoute = require('./routes/admin');
const lidoRoute = require('./routes/lido');


// route middlewares
//app.use('/api/owners', ownerRoute);
//app.use('/api/admins', adminRoute);
app.use('/api/lidos', lidoRoute);


// db connection ==================================================================
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    () => console.log('- connected to data base')
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// =================================================================================


// server port
const port = process.env.PORT;
app.listen(port, () => console.log('- listening on port ' + port));