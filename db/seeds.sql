INSERT INTO department (id, name)
VALUES (1, "Finance"),
       (2, "Legal"),
       (3, "Management"),
       (4, "Security");

INSERT INTO role (id, title, salary, department_id)
VALUES (66, "Director", 200000, 3),
       (677, "Lawyer", 100000, 2),
       (7, "Accountant", 83000, 1),
       (8, "Security Guard", 72000, 4);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (9, "Fernando", "Vasquez", 66),
        (99, "Kyle", "Suydam", 677),
        (999, "Alec", "Horan", 7),
        (9999, "Nano", "Pilot", 8);