const role = require('express').Router();
const pool = require('../../db/config')

role.get('/', (req, res) =>
    pool.query('SELECT * FROM role', function (err, {rows}) {
    res.json(rows);
  }))

module.exports = role;