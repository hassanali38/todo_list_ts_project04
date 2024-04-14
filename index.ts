#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList = [];
console.log(chalk.bold.yellow("\t\t\t\t\tTodo List Application"));

while (true) {
  console.log();
  let operation = await inquirer.prompt([
    {
      type: "list",
      name: "op",
      message: "What operation do you want to perform?",
      choices: ["Add Task", "Remove Task", "View List", "Exit"],
    },
  ]);

  if (operation.op == "Add Task") {
    let todo = await inquirer.prompt([
      {
        type: "input",
        name: "task",
        message: "What do you want to include in the todo list? ",
      },
    ]);

    todoList.push(todo.task);
  } else if (operation.op == "View List") {
    if (todoList.length == 0) {
      console.log(chalk.grey("Empty List"));
    } else {
      console.log(chalk.underline("TODO List:"));
      for (let i = 0; i < todoList.length; i++) {
        console.log(i + 1 + "- " + todoList[i]);
      }
    }
  } else if (operation.op == "Remove Task") {
    if (todoList.length == 0) {
      console.log(chalk.red("No task can be removed i.e. list is empty"));
    } else {
      console.log(chalk.underline("TODO List:"));
      for (let i = 0; i < todoList.length; i++) {
        console.log(i + 1 + "- " + todoList[i]);
      }

      let choseTask = await inquirer.prompt([
        {
          type: "number",
          name: "remove",
          message: "Which task do you want to remove (enter only number)? ",
        },
      ]);

      for (let k = 0; k < todoList.length; k++) {
        if (k + 1 == choseTask.remove) {
          todoList.splice(choseTask.remove - 1, 1);
        }
      }

      console.log("The updated list is: ");
      if (todoList.length == 0) {
        console.log(chalk.grey("Empty List"));
      } else {
        for (let i = 0; i < todoList.length; i++) {
          console.log(i + 1 + "- " + todoList[i]);
        }
      }
    }
  } else if (operation.op == "Exit") {
    break;
  }
}
