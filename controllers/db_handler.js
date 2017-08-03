var config = require('../knexfile.js');  
//var env = 'development';  
var env = process.env.CLEARDB_DATABASE_URL ? "production" : "development";

var knex = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]);