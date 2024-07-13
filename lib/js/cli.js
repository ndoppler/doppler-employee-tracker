const inquirer = require('inquirer')

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
                this.actionSelector = actionSelector;
                
            })
    }
}

module.exports = CLI;