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

var roleChoices = [];
var empChoices = [];
var deptChoices = [];

function lookupRoles(){  
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            roleChoices.push(data[i].id + "-" + data[i].title)
        }
     })
    }

function lookupEmployee(){  
     connection.query("SELECT * FROM employee", function (err, data) {
         if (err) throw err;
         for (i = 0; i < data.length; i++) {
             empChoices.push(data[i].id + "-" + data[i].first_name+" "+ data[i].last_name)
         }
     }) 
    }

function lookupDepts(){
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
        deptChoices.push(data[i].id + "-" + data[i].name)
    }
})
}

function addEmployee() {

  lookupRoles()
  lookupEmployee()

  inquirer.prompt([
  {
    name: "firstname",
    type: "input",
    message: "What is the employee's first name?"
  },

  {
      name: "lastname",
      type: "input",
      message: "What is the employee's last name?"
  },

  {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: roleChoices 
    },

    {
      name: "reportingTo",
      type: "list",
      message: "Who is the employee's manager?",
      choices: empChoices
    }
  
   ]).then(function(answer) {
    var getRoleId =answer.role.split("-")
    var getReportingToId=answer.reportingTo.split("-")
    var query = 
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
     VALUES ('${answer.firstname}','${answer.lastname}','${getRoleId[0]}','${getReportingToId[0]}')`;
    connection.query(query, function(err, res) {
      console.log(`new employee ${answer.firstname} ${answer.lastname} added!`)
    });
    start();
  });
};

function addRole() {

  lookupRoles()
  lookupEmployee()
  lookupDepts()

  inquirer.prompt([
  {
    name: "role",
    type: "input",
    message: "Enter the role you would like to add:"
  },

  {
      name: "dept",
      type: "list",
      message: "In what department would you like to add this role?",
      choices: deptChoices
  },

  {
    name: "salary",
    type: "number",
    message: "Enter the role's salary:"
  },
  
   ]).then(function(answer) {
    console.log(`${answer.role}`)
    var getDeptId =answer.dept.split("-")
    var query = 
    `INSERT INTO role (title, salary, department_id)
     VALUES ('${answer.role}','${answer.salary}','${getDeptId[0]}')`;
    connection.query(query, function(err, res) {
      console.log(`<br>-----new role ${answer.role} added!------`)
    });
    start();
  });
};