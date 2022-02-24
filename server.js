const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const cTable = require('console.table');
const app = express();
const PORT = process.env.PORT || 3001;

//Express middleware
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'employees_db'
},
console.log('Connected to employees_db database.')
);

const mainMenuPrompts = [
  {
    type: 'list',
    name: 'mainMenuPrompt',
    message: "What would you like to do next?",
    choices: [
      `View all departments`,
      `View all roles`,
      `View all employees`,
      `Add a department`,
      `Add a role`,
      `Add an employee`,
      `Update an employee role`
    ]
  },
]

const mainMenuDisplay = () => {
  inquirer.prompt(mainMenuPrompts)
  .then((userChoice) => {
    console.log(userChoice.mainMenuPrompt)
    if (userChoice.mainMenuPrompt === `View all departments`) {
      db.query('SELECT * FROM department', function (err, results)
      {
        console.table(results);
        mainMenuDisplay();
      }
      )
    } else if (userChoice.mainMenuPrompt === `View all roles`) {
      const sql = `Select `
      console.table(`viewing roles`)
      db.query('SELECT * from role', function (err, results){
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
    }
  })
}


//employee table needs
//title, department
//GET RID OF: role_id

// SELECT role, employee
// FROM employee
// JOIN role ON employee.role_id = role.title 



//start app
const init = () => mainMenuDisplay();

init();

//testing
// db.query('SELECT * FROM role', function (err, results)
// {
//   console.log(results);
// })

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

