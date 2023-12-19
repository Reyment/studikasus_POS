// const mongoose = require('mongoose')
// const { dbHost, dbPass, dbName, dbPort, dbUser } = require('../app/config')

// mongoose.connect(`mongodb://:${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`)
// const db = mongoose.connection

// db.on('open', () => {
//     server.listen(port);
//   er.on('error', onError)
//     server.on('Listening',  serv onListening)
// })

// module.exports = db


const mongoose = require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/api_pos', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;



module.exports = db