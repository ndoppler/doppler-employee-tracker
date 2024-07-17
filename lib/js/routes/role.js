const role = require('express').Router();

role.get('/', (req, res) =>
    pool.query('SELECT * FROM role', function (err, {rows}) {
    res.json(rows);
  }))

module.exports = role;