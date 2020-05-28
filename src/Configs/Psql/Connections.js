const { Pool } = require('pg')

//Connection PSQL
var credentials = {
    username: "postgres",
    password: "adiosamor96",
    server: "localhost",
    database: "materiasdb"
}

var config = {
    user: credentials.username,
    database: credentials.database,
    password: credentials.password,
    host: credentials.server,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

//connection heroku app
/* var connectionString = "postgres://mesbnddvzbtmyl:b878f2fbeb73b7a0a5ee8c1889df5d11ecaba01832ee7e6465766b3f0eb2cf4e@ec2-35-172-85-250.compute-1.amazonaws.com:5432/d4lii1upe8grgp"
const pool = new Pool({connectionString,ssl:true,rejectUnauthorized: true})
 */

const pool = new Pool(config)
module.exports = { pool }