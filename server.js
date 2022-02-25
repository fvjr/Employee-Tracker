const inquirer = require('inquirer');
const mysql = require('mysql2');
// const express = require('express');
const cTable = require('console.table');
// const app = express();
// const PORT = process.env.PORT || 3001;
const { mainMenuPrompts, departmentPrompts, employeePrompts } = require('./lib/prompts')

//Express middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

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
        console.table(`Viewing employees`);
        db.query(`SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role,  department.name as Department, role.salary AS Salary, employee.manager_id AS Manager
        FROM role
        join employee on role.id = employee.role_id
        join department on role.department_id = department.id`, function (err, results) {
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
      }
    })
}

const addRole = async () => {
  const [departments] = await db.promise().query('SELECT * FROM department');

  const departmentArray = departments.map(({id, name}) => ({
    name:name, value:id
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
              console.table(results);
              mainMenuDisplay();
            })
          }
          )
}

//start app
const init = () => {
  // db.query('SELECT * FROM department', function (err, results) {
  //   for (let i = 0; i < results.length; i++) {
  //     // console.log(results[i].name)
  //     departmentsArray.push(results[i].name)
  //     // console.log(departmentsArray)
  //   }
  // })
  mainMenuDisplay();
}

//call init function to start app
init();

// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// });

