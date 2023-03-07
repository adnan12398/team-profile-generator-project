const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const idList = [];
const teamMemebers = [];

const appMenu = function(){

    function buildTeam(){
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMemebers), 'utf-8');
    } 

    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "whats the engineers name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "whats the engineers Id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "whats the engineers email?"
            },{
                type: "input",
                name: "engineeGithub",
                message: "whats the engineers github?"
            }
            
        ]).then(answers =>{
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub );
            console.log(engineer)
            teamMemebers.push(engineer);
            idList.push(answers.engineerId);
            createTeam();
        })
    }

    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "whats the interns name?"
            },
            {
                type: "input",
                name: "internId",
                message: "whats the engineers Id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "whats the engineers email?"
            },{
                type: "input",
                name: "interSchool",
                message: "whats the interns school?"
            }
            
        ]).then(answers =>{
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            console.log(intern)
            teamMemebers.push(intern);
            idList.push(answers.internId);
            createTeam();
        })
    }
    
    
    
    
    
    
    
    
    
    
    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "what team member do you want to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I dont want to add anymore"
                ]
            }
        ]).then(userChoice => {
            if (userChoice.memberChoice === "Engineer"){
                addEngineer();
            }else if (userChoice.memberChoice === "Intern"){
                addIntern();
            }else {
                buildTeam();
            }        
         })
    }
    
    
    
    
    
    
    
    function createManager(){
        console.log("build your squad");
        inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "what is the team managers name?",
            validate: answer => {
                if(answer!== ""){
                    return true
                }
            return "enter atleast one character"
            }
        },
        
        {
            type: "input",
            name: "managerId",
            message: "what is the team managers id?"

        },
        {
            type: "input",
            name: "managerEmail",
            message: "whats the team manager email?"
        },
        {
            type:"input",
            name:"managerOfficeNumber",
            message: "whats the team managers office number"
        }

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager);
            teamMemebers.push(manager);
            idList.push(answers.managerId);
            createTeam();
        })
    }

    createManager();

}

appMenu();