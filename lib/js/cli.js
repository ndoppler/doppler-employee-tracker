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
                    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', "Update an Employee's Role", 'Quit']
                }
            ])
            .then(({ actionSelector }) => {
                switch (actionSelector) {
                    case 'View All Departments':
                        viewAllDepartments();
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
                    case "Update an Employee's Role":
                        updateAnEmployee()
                        break;
                    case 'Quit':
                        console.log('Thank you! Have a great day!')
                        process.exit()
                    default:
                        console.log('Invalid action selected');
                }
            })
    }
}

function viewAllDepartments() {
    pool.query('SELECT * FROM department', function (err, { rows }) {
        console.log(rows);
        mainmenu();
    })
};

function viewAllRoles() {
    pool.query('SELECT * FROM role', function (err, { rows }) {
        console.log(rows);
        mainmenu();
    })
};

function viewAllEmployees() {
    pool.query('SELECT * FROM employee', function (err, { rows }) {
        console.log(rows);
        mainmenu();
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
                    console.log('\nDepartment added successfully\n');
                    mainmenu();
                }
            });
        })
}

function addARole() {
    // Prompt for role name first, then salary
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please enter the name of the role.'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the yearly salary of the role.'
        }
    ])
        .then(roleAndSalaryAnswers => {
            const { roleName, salary } = roleAndSalaryAnswers;

            // Query to get departments
            return pool.query('SELECT department_id, name FROM department')
                .then(result => {
                    const departments = result.rows;

                    // Prompt for department selection
                    return inquirer.prompt([
                        {
                            type: 'list',
                            name: 'departmentId',
                            message: 'Please select the department for the role.',
                            choices: departments.map(dept => ({
                                name: dept.name,
                                value: dept.department_id
                            }))
                        }
                    ])
                        .then(departmentAnswer => {
                            const departmentId = departmentAnswer.departmentId;

                            // Insert role into the database
                            const sql = 'INSERT INTO role (department_id, salary, title) VALUES ($1, $2, $3)';
                            const params = [departmentId, salary, roleName];

                            return pool.query(sql, params);
                        })
                        .then(() => {
                            console.log('\nRole added successfully.\n');
                            mainmenu();
                        });
                })
        })
}

function addAnEmployee() {
    // Prompt for first and last name
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the last name of the employee:'
        }
    ])
        .then(answers => {
            const { firstName, lastName } = answers;

            // Query to get roles
            return pool.query('SELECT role_id, title FROM role')
                .then(result => {
                    const roles = result.rows;
                    return inquirer.prompt([
                        {
                            type: 'list',
                            name: 'roleId',
                            message: 'Please select the role for the employee:',
                            choices: roles.map(role => ({
                                name: role.title,
                                value: role.role_id
                            }))
                        }
                    ])
                        .then(roleAnswer => {
                            const roleId = roleAnswer.roleId;

                            // Ask if the employee has a manager
                            return inquirer.prompt([
                                {
                                    type: 'confirm',
                                    name: 'hasManager',
                                    message: 'Does the employee have a manager?',
                                    default: false
                                }
                            ])
                                .then(managerAnswer => {
                                    if (managerAnswer.hasManager) {
                                        // Query to get employees
                                        return pool.query('SELECT employee_id, CONCAT(first_name, \' \', last_name) AS name FROM employee')
                                            .then(employeeResult => {
                                                const employees = employeeResult.rows;
                                                return inquirer.prompt([
                                                    {
                                                        type: 'list',
                                                        name: 'managerId',
                                                        message: 'Please select the manager for the employee:',
                                                        choices: [
                                                            { name: 'None', value: null },
                                                            ...employees.map(emp => ({
                                                                name: emp.name,
                                                                value: emp.employee_id
                                                            }))
                                                        ]
                                                    }
                                                ])
                                                    .then(managerAnswer => {
                                                        const managerId = managerAnswer.managerId;
                                                        return { firstName, lastName, roleId, managerId };
                                                    });
                                            });
                                    } else {
                                        return { firstName, lastName, roleId, managerId: null };
                                    }
                                });
                        });
                })
                .then(employeeData => {
                    // Insert new employee into the database
                    const { firstName, lastName, roleId, managerId } = employeeData;
                    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
                    const params = [firstName, lastName, roleId, managerId];

                    return pool.query(sql, params)
                        .then(result => {
                            console.log('\nEmployee added successfully\n');
                            mainmenu();
                        });
                })
        })
}

function updateAnEmployee() {
    pool.query('SELECT employee_id, CONCAT(first_name, \' \', last_name) AS name FROM employee')
        .then(employeeResult => {
            const employees = employeeResult.rows;
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: "Please select the employee whose role you'd like to update.",
                    choices: employees.map(emp => ({
                        name: emp.name,
                        value: emp.employee_id
                    }))
                }
            ])
                .then(answer => {
                    const employeeId = answer.employeeId
                    return pool.query('SELECT role_id, title FROM role')
                        .then(result => {
                            roles = result.rows;
                            return inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'roleId',
                                    message: 'Please select the new role for the employee.',
                                    choices: roles.map(role => ({
                                        name: role.title,
                                        value: role.role_id
                                    }))
                                }
                            ])
                                .then(roleAnswer => {
                                    const roleId = roleAnswer.roleId;

                                    const sql = 'UPDATE employee SET role_id = $1 WHERE employee_id = $2'
                                    const params = [roleId, employeeId];

                                    return pool.query(sql, params);
                                })
                                .then(() => {
                                    console.log('\n Employee updated sucessfully.\n');
                                    mainmenu();
                                })
                        })
                })

        })
}

function mainmenu() {
    const cli = new CLI();
    cli.run();
}
module.exports = CLI;