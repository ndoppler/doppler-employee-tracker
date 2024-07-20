DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
  department_id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  role_id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) UNIQUE NOT NULL,
  last_name VARCHAR(30) UNIQUE NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id)
  REFERENCES role(role_id),
  FOREIGN KEY (manager_id)
  REFERENCES employee(employee_id)
);