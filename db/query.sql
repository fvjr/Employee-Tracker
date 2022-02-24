-- SELECT employee.id AS Employee_id, employee.first_name AS employee_first_name, department.name AS Department_name
-- FROM employee
-- JOIN department
-- ON employee.role_id = department.name

-- SELECT role.id as Role_id, role.title as Role_title, role.salary AS salary, department.name as Department_name
-- FROM role
-- JOIN department on role.department_id = department.id;


-- WHEN I choose to view all roles
-- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

-- SELECT role.title AS Role_Title, role.id AS Role_id, department.name AS Department, role.salary AS Salary 

-- FROM role
-- join department on role.department_id = department.id;

-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

-- FROM role
-- join department on role.department_id = department.id;

-- SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role, role.salary AS Salary
-- FROM employee
-- join role on employee.role_id  = role.id;


-- FROM role
-- join department on role.department_id = department.id;

SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role, role.salary AS Salary, department.name as Department


-- FROM employee
-- join role on employee.role_id  = role.id,
-- FROM role_id
-- join department on role.department_id = department.name;

FROM role
join employee on role.id = employee.role_id
join department on role.department_id = department.id;

