USE employee_tracker;

INSERT INTO department (name)
VALUES ("Administration"), ("Officers"), ("Detectives");

INSERT INTO role (title, salary, department_id)
VALUES ("Police Chief", 80000, 1), ("Police Officer", 40000, 2), ("Detective", 55000, 3), ("Victim Advocate", 36000, 3), ("Crime Scene Investigator", 36000, 3), ("Evidence Technician", 36000, 3), ("Sergeant", 41000, 1), ("School Resource Officer", 42000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ray", "Holt", 1, 0), ("Officer", "Hitchcock", 2, 1), ("Jake", "Peralta", 3, 1), ("Amy", "Santiago", 4, 1), ("Officer", "Scully", 5, 1), ("Charles", "Boyle", 6,1), ("Terry", "Jeffords", 7, 1), ("Rosa", "Diaz", 8, 1);