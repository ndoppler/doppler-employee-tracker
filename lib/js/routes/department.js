const department = require('express').Router();
const pool = require('../../db/config')

department.get('/', (req, res) =>
    pool.query('SELECT * FROM department', function (err, {rows}) {
    res.json(rows);
  }))

module.exports = department;