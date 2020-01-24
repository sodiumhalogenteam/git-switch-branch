#!/usr/bin/env node

const program = require("commander");
const { exec } = require("child_process");
const inquirer = require("inquirer");
var pjson = require("./package.json");
const branch = require('git-branch');
var branches = require('list-git-branches');
var unique = require('array-unique'); 
var cwd = '.';


// this code returns an array that contains a list of branches that a user has in the current repository

var branches = branches.sync(cwd)
branches = unique(branches); 

// this code lists the current branch that a user is in
var currBranch = branch.sync();  //=> 'Branch: master'

console.log("Your current branch is: " + currBranch); 
var questions = [
  {
    type: "list", 
    name: "branch", 
    message: "Select a branch to checkout:", 
    choices: branches
  }
]; 

const makeCheckout = command => {
  exec(command, function(err,stdout, stderr) {
    if (err) {
      console.log (err); 
      return; 
    }
    if (stdout.length > 0) console.log(`${stdout.toString("utf8")}`); 
    if (stderr.length > 0) console.log(`${stderr.toString("utf8")}`); 
  }); 
}; 

console.log("Select a branch to checkout"); 
inquirer.prompt(questions).then(answers => {
  let branch = JSON.stringify(answers.branch, null, " "); 
  let branchCleaned = branch.slice(1, branch.length - 1); 
  makeCheckout(
    `git checkout ${branchCleaned}`
  );  
}
  )