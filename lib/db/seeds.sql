INSERT INTO department (department_id, name)
VALUES  (01, 'Sales'),
        (02, 'Marketing'),
        (03, 'Human Resources');

SELECT * FROM department;

INSERT INTO role (role_id, title, salary, department_id)
VALUES  (01, 'Salesperson', 50000, 01),
        (02, 'Sales Manager', 75000, 01),
        (03, 'Market Analyst', 60000, 02),
        (04, 'Marketing Manager', 80000, 02),
        (05, 'HR Representative', 35000, 03),
        (06, 'HR Manager', 55000, 03);

SELECT * FROM  role;