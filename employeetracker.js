const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: "",
   database: "employee_db"
});

connection.connect(function(err){
   if (err) throw err;
   start();
}) ;

function start() {
   inquirer
     .prompt({
       name: "selection",
       type: "list",
       message: "What would you like to do?",
       choices: [
         "View all Employees",
         "View Departments",
         "View Roles",
         "Add Employee",
         "Add Department",
         "Add Role",
         "Update Employee",
       ]
     })
     .then(function(answer) {
      console.log(answer);
    
    if (answer.selection === "View All Employees") {
      viewAll();
    }
    else if(answer.selection === "View Departments") {
      viewDepts();

    } 
    else if(answer.selection === "View Roles") {
      viewRoles();

    }
    else if(answer.selection === "Add Employee") {
      addEmployee();

    }
    else if(answer.selection === "Add Department") {
      addDept();

    }
    else if(answer.selection === "Add Role") {
      addRole();

    }
    else if(answer.selection === "Update Employee") {
      updateEmployee();

    }else{
      connection.end();
    }
  });
}

function viewAll() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", 
    function(err, result, fields) {
      if (err) throw err;
      console.table(result);
      start();
    }
  );
};

function viewRoles() {
connection.query(
"SELECT role.id, role.title, role.salary, role.department_id, department.id, department.name FROM role LEFT JOIN department on role.department_id = department.id",
function(err, result, fields) {
 if (err) throw err;
 console.table(result);
 start();
}
); };

function viewDepts() {
connection.query("SELECT * FROM department", function(err, result, fields) {
  if (err) throw err;
  console.table(result);
  start();
}
); };