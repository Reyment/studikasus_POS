const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
module.exports = {
    rootPath: path.resolve(__dirname, '..'),
    secretKey: process.env.SECRET_KEY,
    serviceName: process.env.SERVICE_NAME,
    dbHost: process.emit.DB_HOST,
    dbPort: process.emit.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,

}