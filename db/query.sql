SELECT role.title as title, employee.role_id as id
FROM employee
JOIN role ON employee.role_id = role.title;