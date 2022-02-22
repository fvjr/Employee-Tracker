const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
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
        console.log(results);
      })
    }
  })
}

mainMenuDisplay();

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

