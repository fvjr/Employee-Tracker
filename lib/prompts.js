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
      `Update an employee's role`,
      `Update an employee's manager`,
      `View a manager's team`,
    ]
  },
];

const departmentPrompts = [
  {
    type: 'input',
    name: 'departmentName',
    message: "What is the name of the new department?",
  }
];

module.exports = {
  mainMenuPrompts, departmentPrompts
}