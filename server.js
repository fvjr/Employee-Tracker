const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const cTable = require('console.table');
const app = express();
const PORT = process.env.PORT || 3001;
const {mainMenuPrompts, departmentPrompts, rolePrompts, employeePrompts} = require('./lib/prompts')

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employees_db'
},
  console.log('Connected to employees_db database.')
);

// const mainMenuPrompts = [
//   {
//     type: 'list',
//     name: 'mainMenuPrompt',
//     message: "What would you like to do next?",
//     choices: [
//       `View all departments`,
//       `View all roles`,
//       `View all employees`,
//       `Add a department`,
//       `Add a role`,
//       `Add an employee`,
//       `Update an employee role`
//     ]
//   },
// ]

// const departmentPrompts = [
//   {
//     type: 'input',
//     name: 'departmentName',
//     message: "What is the name of the new department?",
//   }
// ]

// const rolePrompts = [
//   {
//     type: 'input',
//     name: 'name',
//     message: "What is the name of the new role?",
//   },
//   {
//     type: 'number',
//     name: 'salary',
//     message: "What is the salary for this role?"
//   },
//   {
//     type: 'input',
//     name: 'department',
//     message: 'What department does the role belong to?',
//     //i want to return DB select * department names from this choices aray
//     // choices: []
//   }
// ]

// const employeePrompts = [
//   {
//     type: 'input',
//     name: 'firstName',
//     message: "What is the new employee's first name?",
//   },
//   {
//     type: 'input',
//     name: 'lastName',
//     message: "What is the new employee's last name?",
//   },
//   //i want to make role a list
//   // {
//   //   type: 'input',
//   //   name: 'role',
//   //   message: "What is the new employee's role?",
//   // },
//   // //i want to make manager a list
//   // {
//   //   type: 'input',
//   //   name: 'manager',
//   //   message: "Who is the new employee's manager?",
//   // },
// ]

const mainMenuDisplay = () => {
  inquirer.prompt(mainMenuPrompts)
    .then((userChoice) => {
      console.log(userChoice.mainMenuPrompt)
      if (userChoice.mainMenuPrompt === `View all departments`) {
        db.query('SELECT * FROM department', function (err, results) {
          console.table(results);
          mainMenuDisplay();
        }
        )
      } else if (userChoice.mainMenuPrompt === `View all roles`) {
        const sql = `Select `
        console.table(`viewing roles`)
        db.query('SELECT * from role', function (err, results) {
          //NEED A JOIN FOR THIS?
          console.table(results);
          mainMenuDisplay();
        }
        )
      } else if (userChoice.mainMenuPrompt === `View all employees`) {
        console.table(`Viewing employees`);
        db.query(`Select * from employee`, function (err, results) {
          console.table(results);
          mainMenuDisplay();
        })
      } else if (userChoice.mainMenuPrompt === `Add a department`) {
        inquirer.prompt(departmentPrompts)
          .then((departmentData) => {
            const sql = `INSERT INTO department (name) VALUES (?)`
            const params = departmentData.departmentName;

            db.query(sql, params, function (err, result) {
              mainMenuDisplay();
            })

          })
      } else if (userChoice.mainMenuPrompt === `Add a role`) {
        inquirer.prompt(rolePrompts)
          .then((roleData) => {
            const sql = `INSERT INTO role (title, salary) VALUES (?)`
            const params = [roleData.name, roleData.salary]
            db.query(sql, [params], function (err, result) {
              if (err) {
                console.log(err)
              }
              mainMenuDisplay();
            })
          }
          )
      } else if (userChoice.mainMenuPrompt === `Add an employee`) {
        inquirer.prompt(employeePrompts)
        .then((employeeData) => {
          const sql = `INSERT INTO employee (first_name, last_name) VALUES (?)`
          const params = [employeeData.firstName, employeeData.lastName]
          db.query(sql, [params], function (err, result) {
            if (err) {
              console.log(err)
            }
            mainMenuDisplay();
        })
      })
    }})
}


//employee table needs
//title, department
//GET RID OF: role_id

//start app
const init = () => mainMenuDisplay();

init();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

