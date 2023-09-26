// Task list elements
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("pending-tasks-list");
const completedTasksList = document.getElementById("completed-tasks-list");
const completedTasksTitle = document.getElementById("completed-tasks-collapsible");

// Buttons
const addButton = document.getElementById("add-button");
const actionButtons = document.getElementById("action-buttons");
const deleteButton = document.getElementById("delete-selected-button");
const markAsCompletedButton = document.getElementById("mark-completed-selected-button");



// Add a click event listener to the "Add" button
addButton.addEventListener("click", addTask);



//Function to add a new task
function addTask() {
    // Get the task text from the input field
    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new list item
        const listItem = document.createElement("li");

        // Create a checkbox for each task created
        const listCheckBox = document.createElement("input")
        listCheckBox.type = "checkbox";
        listCheckBox.classList.add("task-checkbox");
        listCheckBox.checked = false;

        // Create label for each task created
        const label = document.createElement("label");
        label.textContent = taskText;

        // Append checkbox and label to the list item
        listItem.appendChild(listCheckBox);
        listItem.appendChild(label);

        //Append the new task to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";

    }
}

function toggleActionButtons() {

    //Create an array containing all the selected tasks
    const selectedCompletedTasks = Array.from(completedTasksList.querySelectorAll(".task-checkbox:checked"));
    const selectedPendingTasks = Array.from(taskList.querySelectorAll(".task-checkbox:checked"));
    
    // Only show the action buttons when a task is selected
    if (selectedPendingTasks.length != 0 || selectedCompletedTasks.length != 0) {
        actionButtons.style.display = "block";
    } else {
        actionButtons.style.display = "none"
    }
}

// Check the status of the buttons everytime either list changes and only restrict task selection from one list at a time
completedTasksList.addEventListener("change", () => {

    const selectedPendingTasks = Array.from(taskList.querySelectorAll(".task-checkbox:checked"));
    toggleActionButtons();

    selectedPendingTasks.forEach((task) => {
        task.checked = false;
    });
    markAsCompletedButton.textContent = "Mark as Pending";
});

// Check the status of the buttons everytime either list changes and only restrict task selection from one list at a time
taskList.addEventListener("change", () => {
    const selectedCompletedTasks = Array.from(completedTasksList.querySelectorAll(".task-checkbox:checked"));
    toggleActionButtons();

    selectedCompletedTasks.forEach((task) => {
        task.checked = false;
    });
    markAsCompletedButton.textContent = "Mark as Completed";
});


// Action for when the "Delete" button is pressed
deleteButton.addEventListener("click", () => {

    const selectedCompletedTasks = Array.from(completedTasksList.querySelectorAll(".task-checkbox:checked"));
    const selectedPendingTasks = Array.from(taskList.querySelectorAll(".task-checkbox:checked"));
    
    selectedPendingTasks.forEach((task) => {
        task.parentElement.remove();
    });

    selectedCompletedTasks.forEach((task) => {
        task.parentElement.remove();
    });

    //Update buttons status and completed tasks count
    toggleActionButtons();
    updateCompletedTasksCount();
})

// Action for when the "Mark as completed" button is pressed
markAsCompletedButton.addEventListener("click", () => {

    // Classify selected tasks as "Completed" and move them to the Completed Tasks list
    const selectedCompletedTasks = Array.from(taskList.querySelectorAll(".task-checkbox:checked")); // Loop through the checked tasks
    selectedCompletedTasks.forEach((task) => {
        task.parentElement.classList.toggle("Completed"); // Mark as completed
        completedTasksList.appendChild(task.parentElement);
        task.checked = false;
    });

    // Do the same as the last part of the code but in reverse
    const selectedPendingTasks = Array.from(completedTasksList.querySelectorAll(".task-checkbox:checked")); // Loop through the checked tasks
    selectedPendingTasks.forEach((task) => {
        task.parentElement.classList.toggle("Completed"); // Mark as completed
        taskList.appendChild(task.parentElement);
        task.checked = false;
    });

    //Update buttons status and completed tasks count
    toggleActionButtons();
    updateCompletedTasksCount();
})

// Update Completed Tasks count
function updateCompletedTasksCount() {
    const completedTasksCount = Array.from(completedTasksList.querySelectorAll("li"));
    var i = 0;
    completedTasksCount.forEach((task) => {
        i = i + 1;
    });
    completedTasksTitle.textContent = "Completed tasks (" + i + ")";
}

// Add a keypress event listener to the input field to allow adding tasks by pressing Enter
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});