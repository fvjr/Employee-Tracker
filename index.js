const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { mainMenuPrompts, departmentPrompts, } = require('./lib/prompts')

//connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Toki2661()',
  database: 'employees_db'
},
  console.log('Connected to employees_db database.')
);

//get user input via prompts and display requested information
const mainMenuDisplay = () => {
  inquirer.prompt(mainMenuPrompts)
    .then((userChoice) => {
      if (userChoice.mainMenuPrompt === `View all departments`) {
        db.query('SELECT * FROM department', function (err, results) {
          console.table(results);
          mainMenuDisplay();
        }
        )
      } else if (userChoice.mainMenuPrompt === `View all roles`) {
        const sql = `Select `
        console.table(`viewing roles`)
        db.query('SELECT role.title AS Role_Title, role.id AS Role_id, department.name AS Department, role.salary AS Salary FROM role join department on role.department_id = department.id;', function (err, results) {
          console.table(results);
          mainMenuDisplay();
        }
        )
      } else if (userChoice.mainMenuPrompt === `View all employees`) {
        db.query(`SELECT employee.id AS Employee_ID, CONCAT(employee.first_name, " ", employee.last_name) AS Name, role.title AS Role, role.salary AS Salary, department.name as Department, manager.first_name AS Manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id`, function (err, results) {
          console.table(results);
          mainMenuDisplay();
        })
      } else if (userChoice.mainMenuPrompt === `Add a department`) {
        inquirer.prompt(departmentPrompts)
          .then((departmentData) => {
            const sql = `INSERT INTO department (name) VALUES (?)`
            const params = departmentData.departmentName;
            db.query(sql, params, function (err, results) {
              mainMenuDisplay();
              console.log(`${departmentData.departmentName} department created.`);
            })
          })
      } else if (userChoice.mainMenuPrompt === `Add a role`) {
        addRole();
      } else if (userChoice.mainMenuPrompt === `Add an employee`) {
        addEmployee();
      } else if (userChoice.mainMenuPrompt === `Update an employee's role`) {
        updateRole();
      } else if (userChoice.mainMenuPrompt === `Update an employee's manager`){
        updateManager();
      } else if (userChoice.mainMenuPrompt === `View a manager's team`) {
        viewByManager();
      }
    })
};

//add new role/job 
const addRole = async () => {
  const [departments] = await db.promise().query('SELECT * FROM department');
  const departmentArray = departments.map(({ id, name }) => ({
    name: name, value: id
  }))
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the name of the new role?",
    },
    {
      type: 'number',
      name: 'salary',
      message: "What is the salary for this role?"
    },
    {
      type: 'list',
      name: 'department',
      message: 'What department does the role belong to?',
      choices: departmentArray
    }])
    .then((roleData) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?)`
      const params = [roleData.name, roleData.salary, roleData.department]
      db.query(sql, [params], function (err, results) {
        if (err) {
          console.log(err)
        }
        mainMenuDisplay();
      })
    }
    )
};

//add new employee
const addEmployee = async () => {
  const [employee] = await db.promise().query('SELECT * FROM employee');
  const [role] = await db.promise().query('SELECT * FROM role');

  const roleArray = role.map(({ id, title }) => (
    { name: title, value: id }
  ))

  const managerArray = employee.map(({ id, first_name }) => ({ name: first_name, value: id }))
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the new employee's first name?",
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the new employee's last name?",
    },
    {
      type: 'list',
      name: 'role',
      message: "What is the new employee's role?",
      choices: roleArray
    },
    {
      type: 'list',
      name: 'manager',
      message: "Who is the new employee's manager?",
      choices: managerArray
    },
  ]
  )
    .then((employeeData) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`
      const params = [employeeData.firstName, employeeData.lastName, employeeData.role, employeeData.manager]
      db.query(sql, [params], function (err, result) {
        if (err) {
          console.log(err)
        }
        mainMenuDisplay();
      })
    })
};

//updates employee role
const updateRole = async () => {
  const [employee] = await db.promise().query('SELECT * FROM employee');

  const [role] = await db.promise().query('SELECT * FROM role');

  const roleArray = role.map(({ id, title }) => (
    { name: title, value: id }
  ));
  const employeeArray = employee.map(({ id, first_name }) => ({ name: first_name, value: id }));

  inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: "Which employee would you like to update?",
      choices: employeeArray
    },
    {
      type: 'list',
      name: 'newRole',
      message: "What is the employee's new role?",
      choices: roleArray
    }
  ]
  )
    .then((employeeData) => {
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [employeeData.newRole, employeeData.employee];
      db.query(sql, params, function (err, result) {
        if (err) {
          console.log(err)
        }
        mainMenuDisplay();
      })
    })
};

//function to update employee's manager
const updateManager = async () => {
  const [employee] = await db.promise().query('SELECT * FROM employee');

  const managerArray = employee.map(({ id, first_name }) => ({ name: first_name, value: id }))

  const employeeArray = employee.map(({ id, first_name }) => ({ name: first_name, value: id }));

  inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: "Which employee would you like to update?",
      choices: employeeArray
    },
    {
      type: 'list',
      name: 'newManager',
      message: "Who is the employee's new manager??",
      choices: managerArray
    }
  ]
  )
    .then((employeeData) => {
      const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
      const params = [employeeData.newManager, employeeData.employee];
      db.query(sql, params, function (err, result) {
        if (err) {
          console.log(err)
        }
        mainMenuDisplay();
      })
    })

};

//function to view employees by manager
const viewByManager = async () => {
  const [employee] = await db.promise().query('SELECT * FROM employee');

  const managerArray = employee.map(({ id, first_name }) => ({ name: first_name, value: id }));

  inquirer.prompt([
    {
      type: 'list',
      name: 'manager',
      message: "Which manager's team would you like to view?",
      choices: managerArray
    },
  ]
  )
    .then((employeeData) => {
      const sql = `SELECT first_name AS Employee from employee WHERE manager_id = ?;`
      const params = [employeeData.manager];
      db.query(sql, params, function (err, result) {
        if (err) {
          console.log(err)
        }
        else if (result.length === 0 ) {
          console.log(`Selected employee is not a manager. Please make another selection.`)
        }
        mainMenuDisplay();
      })
    })
};

//function to start app
const init = () => {
  mainMenuDisplay();
};

//call init function to start app
init();
