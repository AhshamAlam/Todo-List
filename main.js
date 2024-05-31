#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
console.log(chalk.whiteBright.bold("\n\t Wellcome To Your Todo-List\n"));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"]
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        } // To Exit program
        else if (option.choice === "Exit") {
            condition = false;
        }
    }
};
// Function to add new Tasks
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task :"
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task}Task added in Todo-List\n`);
};
// Function to view Tasks
let viewTask = () => {
    console.log("\n Your Todo-list is :\n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
// Function to delete Tasks
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index no of the task you want to delete",
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask}This tasl has been deleted from your Todo-List\n`);
};
// Function to update Tasks
let updateTask = async () => {
    await viewTask();
    let updateIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index  no of the task you want to update"
        },
        {
            name: "newTask",
            type: "input",
            message: "Now enter the new task"
        }
    ]);
    todoList[updateIndex.index - 1] = updateIndex.newTask;
    console.log(`\n Task at index no. ${updateIndex.index - 1} has been updated [For the updated list check the option: "View Todo-List"]\n`);
};
main();
