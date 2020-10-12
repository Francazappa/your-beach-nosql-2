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
const authRoutes = require('./routes/auth');

/*
const ownerRoutes = require('./routes/owner');
const adminRoutes = require('./routes/admin');
const lidoRoutes = require('./routes/lido');
*/

// route middlewares
app.use('/auth', authRoutes);

/*
app.use('/api/owners', ownerRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/lidi', lidoRoutes);
*/

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