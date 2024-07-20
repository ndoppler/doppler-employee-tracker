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
                    default:
                        console.log('Invalid action selected');
                }
            })
    }
}

function viewAllDepartments() {
    pool.query('SELECT * FROM department', function (err, { rows }) {
            console.log(rows);
    })
};

function viewAllRoles() {
    pool.query('SELECT * FROM role', function (err, { rows }) {
            console.log(rows);
    })
};

function viewAllEmployees() {
    pool.query('SELECT * FROM employee', function (err, { rows }) {
            console.log(rows);
    })
};

module.exports = CLI;