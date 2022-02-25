DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT AUTO_INCREMENT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

-- CREATE TABLE employee(
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   first_name VARCHAR(30),
--   last_name VARCHAR(30),
--   role_id INT,
--   manager_id INT,
--   FOREIGN KEY (role_id)
--   REFERENCES role(id),
--   FOREIGN KEY (manager_id)
--   REFERENCES employee(id)
--   ON DELETE SET NULL
-- );

CREATE TABLE employee(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT REFERENCES id ON DELETE SET NULL,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);
