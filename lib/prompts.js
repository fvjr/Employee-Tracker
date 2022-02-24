const fs = require('fs');

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

const departmentPrompts = [
  {
    type: 'input',
    name: 'departmentName',
    message: "What is the name of the new department?",
  }
]

const rolePrompts = [
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
    type: 'input',
    name: 'department',
    message: 'What department does the role belong to?',
    //i want to return DB select * department names from this choices aray
    // choices: []
  }
]

const employeePrompts = [
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
  //i want to make role a list
  // {
  //   type: 'input',
  //   name: 'role',
  //   message: "What is the new employee's role?",
  // },
  // //i want to make manager a list
  // {
  //   type: 'input',
  //   name: 'manager',
  //   message: "Who is the new employee's manager?",
  // },
]

module.exports = {
  mainMenuPrompts, departmentPrompts, rolePrompts, employeePrompts
}