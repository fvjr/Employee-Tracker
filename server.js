const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { mainMenuPrompts, departmentPrompts, } = require('./lib/prompts')

//connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employees_db'
},
  console.log('Connected to employees_db database.')
);

const mainMenuDisplay = () => {
  inquirer.prompt(mainMenuPrompts)
    .then((userChoice) => {
      // console.log(userChoice.mainMenuPrompt)
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
        // const departments = await db.promise().query('SELECT * FROM department');
        // console.log(departments)



        // inquirer.prompt(rolePrompts)
        //   .then((roleData) => {
        //     const sql = `INSERT INTO role (title, salary) VALUES (?)`
        //     const params = [roleData.name, roleData.salary,]
        //     db.query(sql, [params], function (err, results) {
        //       if (err) {
        //         console.log(err)
        //       }
        //       console.table(results);
        //       mainMenuDisplay();
        //     })
        //   }
        //   )
      } else if (userChoice.mainMenuPrompt === `Add an employee`) {
        addEmployee()
      }
    })
}


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
      message: "What is the new employee's role_id?",
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
}

//function to start app
const init = () => {
  mainMenuDisplay();
};

//call init function to start app
init();

