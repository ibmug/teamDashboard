const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


// array of questions for user
// const questions = [

// ];

const empArray = [];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
  
    askMember();
  
}


function askMember(){
  
  inquirer
  .prompt([
    {
      type: 'input',
      message: "What is the member's name?",
      name: 'mName',
    },
    {
      type: 'input',
      message: "What is the member's email?",
      name: 'mMail',
    },
    {
      type: 'list',
      message: 'What is the memebers role in the team?',
      choices: ["Manager","Engineer","Intern"],
      name: 'mRole',
    },
  ])
  .then((data) =>{
      //We could create the employee right now, 
        createMember(data);
        return;
  });

}


function askManager(info){
  
  inquirer
  .prompt([
    {
      type: 'number',
      message: "What is the manager's office Number?",
      name: 'oNumber',
    },
    {
      type: 'list',
      message: 'Would you like to add another employee?',
      choices: ["Yes","No"],
      name: 'addMember',
    },
  ])
  .then((data) =>{
      //We could create the employee right now, 
      //name,id,email,office number
     // var aManager= new Manager("Kain",1,"kainatkain",123234);
        const aManager = new Manager(info.mName, empArray.length+1, info.mMail,data.oNumber);
        empArray.push(aManager);
        if(data.addMember ==="Yes"){
          askMember();
        }else{
          generateOutput();
          return;
        }
        return;
  });

}



function askEngineer(info){
  
  inquirer
  .prompt([
    {
      type: 'input',
      message: "What is the engineer's git?",
      name: 'git',
    },
    {
      type: 'list',
      message: 'Would you like to add another employee?',
      choices: ["Yes","No"],
      name: 'addMember',
    },
  ])
  .then((data) =>{
      //We could create the employee right now, 
      //name,id,email,git
        const aEngineer = new Engineer(info.mName, empArray.length+1, info.mMail,data.git);
        empArray.push(aEngineer);
        if(data.addMember ==="Yes"){
          askMember();
        }else{
          generateOutput();

          return;
        }
        return;
  });

}

function generateOutput(){
  console.log(empArray);
  if(!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(empArray),"UTF-8");
}


function askIntern(info){
  
  inquirer
  .prompt([
    {
      type: 'inputR',
      message: "What school do you study in?",
      name: 'school',
    },
    {
      type: 'list',
      message: 'Would you like to add another employee?',
      choices: ["Yes","No"],
      name: 'addMember',
    },
  ])
  .then((data) =>{
      //We could create the employee right now, 
      //name,id,email,school
     
        const aIntern = new Intern(info.mName, empArray.length+1, info.mMail,data.school);
        empArray.push(aIntern);
        if(data.addMember ==="Yes"){
          askMember();
        }else{
          generateOutput();
          return;
        }
        return;
  });

}





function createMember(data){
  switch(data.mRole){
    case "Manager":
      //name, id, email,officenumber
      //console.log("Creating a Manager");
      askManager(data);
    break;

    case "Intern":
      askIntern(data);
    break;

    case "Engineer":
      askEngineer(data);
    break;

    default:
      console.log("This is not recognized, try again");
    break;
  }

  
  return;
}

// function call to initialize program
//init();
init();



  function printFile(data){

   //Do something with the data.
   console.log(data);
  };
