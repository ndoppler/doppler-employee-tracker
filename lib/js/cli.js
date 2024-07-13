const inquirer = require('inquirer')

class CLI {
    constructor() {
        this.function = '';
    }

    run() {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'function',
                    message: "What would you like to do?",
                    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
                }
            ])
    }
}

module.exports = CLI;