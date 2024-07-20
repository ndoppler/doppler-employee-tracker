const inquirer = require('inquirer')
const pool = require('../db/config.js')


class CLI {
    constructor() {
        this.actionSelector = '';
    }

    run() {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'actionSelector',
                    message: "What would you like to do?",
                    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
                }
            ])
            .then(({ actionSelector }) => {
                switch (actionSelector) {
                    case 'View All Departments':
                        viewAllDepartments()
                        break;
                    case 'View All Roles':
                        viewAllRoles()
                        break;
                    case 'View All Employees':
                        viewAllEmployees()
                        break;
                    case 'Add a Department':
                        addADepartment()
                        break;
                    case 'Add a Role':
                        addARole()
                        break;
                    case 'Add an Employee':
                        addAnEmployee()
                        break;
                    default:
                        console.log('Invalid action selected');
                }
            })
    }
}

function viewAllDepartments() {
    pool.query('SELECT * FROM department', function (err, { rows }) {
        console.log(rows);
        cli.run();
    })
};

function viewAllRoles() {
    pool.query('SELECT * FROM role', function (err, { rows }) {
        console.log(rows);
        cli.run();
    })
};

function viewAllEmployees() {
    pool.query('SELECT * FROM employee', function (err, { rows }) {
        console.log(rows);
        cli.run();
    })
};

function addADepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentAdd',
                message: 'Please name the department you would like to add.'
            }
        ])
        .then(promptAnswer => {
            const departmentName = promptAnswer.departmentAdd;

            const sql = 'INSERT INTO department (name) VALUES ($1)';
            const params = [departmentName];

            pool.query(sql, params, (err, result) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                } else {
                    console.log('Department added successfully');
                }
            });
        })

}

function addARole() {
    pool.query('SELECT name FROM department', (err, { rows }) => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'departmentNames',
                    message: 'Please select a department.',
                    choices: rows
                },
                {
                    type: 'list',
                    name: 'departmentNames',
                    message: "Please select a department.",
                    choices: rows
                }
            ]

            )
    })
}

const cli = new CLI();

module.exports = CLI;