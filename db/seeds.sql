-- INSERT INTO department (id, name)
-- VALUES (1, "Finance"),
--        (2, "Legal"),
--        (3, "Management"),
--        (4, "Security");

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (111, "Director", 200000, 3),
--        (222, "Lawyer", 100000, 2),
--        (333, "Accountant", 83000, 1),
--        (444, "Security", 72000, 4);

-- INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
-- VALUES (1, "Fern", "V", 1, 0)
--         (2, "Kyle", "S", 2, 0)
--         (3, "Alec", "H", 3, 0)
--         (4, "Nano", "S", 4, 0)

INSERT INTO department (id, name)
VALUES (1, "Finance"),
       (2, "Legal"),
       (3, "Management"),
       (4, "Security");

INSERT INTO role (id, title, salary)
VALUES (66, "Director", 200000),
       (677, "Lawyer", 100000),
       (7, "Accountant", 83000),
       (8, "Security", 72000);

INSERT INTO employee (id, first_name, last_name)
VALUES (9, "Fern", "V"),
        (99, "Kyle", "S"),
        (999, "Alec", "H"),
        (9999, "Nano", "S");