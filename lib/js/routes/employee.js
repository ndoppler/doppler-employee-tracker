const employee = require('express').Router();

employee.get('/', (req, res) =>
    pool.query('SELECT * FROM employee', function (err, {rows}) {
    res.json(rows);
  }))

module.exports = employee;