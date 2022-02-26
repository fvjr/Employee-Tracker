INSERT INTO department (id, name)
VALUES (1, "Finance"),
       (2, "Legal"),
       (3, "Leadership"),
       (4, "Development");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Director", 150000, 3),
       (2, "Lawyer", 179999, 2),
       (3, "Accountant", 131000, 1),
       (4, "Programmer", 123000, 4),
       (5, "Manager", 141000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Fernando", "Vasquez", 1, null),
        (2, "Kyle", "Suydam", 5, 1),
        (3, "Alec", "Horan", 3, 2),
        (4, "Harry", "Zalman", 4, 2),
        (5, "Matt", "Ho", 4, 2);