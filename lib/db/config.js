const { Pool } = require('pg');

const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: 'apple',
      host: 'localhost',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.\n`)
  )

module.exports = pool;