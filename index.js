const CLI = require('./lib/js/cli.js');
const pool = require('./lib/db/config.js')

pool.connect();
const cli = new CLI();

cli.run();