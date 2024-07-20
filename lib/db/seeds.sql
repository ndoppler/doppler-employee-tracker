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