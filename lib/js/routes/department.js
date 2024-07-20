const department = require('express').Router();
const pool = require('../../db/config')

department.get('/', (req, res) =>
    pool.query('SELECT * FROM department', function (err, { rows }) {
        res.json(rows);
    }))

department.post('/', ({ body }, res) => {
    const sql = `INSERT INTO department (name)
    VALUES ($1)`;
    const params = [body.name];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
})

module.exports = department;