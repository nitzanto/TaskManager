/*
Created by:

Nitzan Toledo - I.D. 324247840
Omri Finegold - I.D. 318913456
*/

// Store the tasks in an array
let tasks = [];

// Function to add a new task
function addTask() {
  const newTaskInput = document.getElementById('new-task-input');
  const errorMessage = document.getElementById('error-message');
  const taskName = newTaskInput.value.trim();

  newTaskInput.addEventListener('input', function() {
    if (this.value.length > 30) {
      this.value = this.value.slice(0, 30);
    }
  });

  if (taskName !== '') {
    tasks.push(taskName);
    renderTasks();
    newTaskInput.value = '';
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to render the tasks list
function renderTasks() {
  const tasksList = document.getElementById('tasks');
  tasksList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');

    // Create a span element for the task number
    const taskNumber = document.createElement('span');
    taskNumber.textContent = `${index + 1}.`;
    taskNumber.classList.add('task-number');
    listItem.appendChild(taskNumber);

    // Create a span element for the task name
    const taskNameSpan = document.createElement('span');
    taskNameSpan.textContent = task;
    listItem.appendChild(taskNameSpan);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    buttonsContainer.appendChild(deleteButton);

    if (index > 0) {
      const upButton = document.createElement('button');
      upButton.textContent = 'Up';
      upButton.addEventListener('click', () => moveTaskUp(index));
      buttonsContainer.appendChild(upButton);
    }

    if (index < tasks.length - 1) {
      const downButton = document.createElement('button');
      downButton.textContent = 'Down';
      downButton.addEventListener('click', () => moveTaskDown(index));
      buttonsContainer.appendChild(downButton);
    }

    listItem.appendChild(buttonsContainer);
    tasksList.appendChild(listItem);
  });
}

// Function to move a task up
function moveTaskUp(index) {
  if (index > 0) {
    [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
    renderTasks();
  }
}

// Function to move a task down
function moveTaskDown(index) {
  if (index < tasks.length - 1) {
    [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
    renderTasks();
  }
}

// Get the add task button
const addButton = document.getElementById('add-button');

// Add event listener to the add task button
addButton.addEventListener('click', addTask);

// Render the initial tasks
renderTasks();
