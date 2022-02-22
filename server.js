const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

const connection = mysql.createConnection({
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
    name: 'menu',
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
    console.log(userChoice)
  })
}

mainMenuDisplay();