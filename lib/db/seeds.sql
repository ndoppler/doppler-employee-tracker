INSERT INTO department (name)
VALUES  ('Sales'),
        ('Marketing'),
        ('Human Resources');

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES  ('Salesperson', 50000, 01),
        ('Sales Manager', 75000, 01),
        ('Market Analyst', 60000, 02),
        ('Marketing Manager', 80000, 02),
        ('HR Representative', 35000, 03),
        ('HR Manager', 55000, 03);

SELECT * FROM  role;

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Jim', 'Thomas', 02),
        ('Maya', 'Meiser', 04),
        ('Stephanie', 'Stephanopolis', 06);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Ernie', 'Erickson', 01, 01),
        ('Josh', 'Rover', 03, 02),
        ('Emily', 'Allen', 05, 03);

SELECT * FROM employee;