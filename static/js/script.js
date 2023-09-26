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
    console.log("Pending: " + selectedPendingTasks.length);
    console.log("Completed: " + selectedCompletedTasks.length);
    
    // Show or hide the buttons accordingly
    if (selectedPendingTasks.length === 0 && selectedCompletedTasks.length === 0) {
        actionButtons.style.display = "none";
    } else if (selectedPendingTasks.length > 0 || selectedCompletedTasks.length > 0) {
        actionButtons.style.display = "block"

        // If an item from "Pending" is selected and one or more items from "Completed" were previously selected, uncheck everything from "Completed"
        if (selectedPendingTasks.length >= 1 && selectedCompletedTasks.length >= 0) { 
            actionButtons.style.display = "block";
            markAsCompletedButton.textContent = "Mark Selected As Completed";
            selectedCompletedTasks.forEach((task) => {
                task.checked = false;
            })
        } else if (selectedCompletedTasks.length >= 1 && selectedPendingTasks >= 0) {
            actionButtons.style.display = "block";
            markAsCompletedButton.textContent = "Mark Selected As Pending";
            selectedPendingTasks.forEach((task) => {
                task.checked = false;
            })
        }
    }
}

// Check the status of the buttons everytime either list changes
taskList.addEventListener("change", toggleActionButtons);
completedTasksList.addEventListener("change", toggleActionButtons);


// Action for when the "Delete" button is pressed
deleteButton.addEventListener("click", () => {
    const selectedTasks = Array.from(taskList.querySelectorAll(".task-checkbox:checked")); // Loop through the checked tasks
    selectedTasks.forEach((task) => {
        task.parentElement.remove();
    })
    toggleActionButtons();
})

// Action for when the "Mark as completed" button is pressed
markAsCompletedButton.addEventListener("click", () => {
    // Classify selected tasks as "Completed" and move them to the Completed Tasks list
    const selectedTasks = Array.from(taskList.querySelectorAll(".task-checkbox:checked")); // Loop through the checked tasks
    selectedTasks.forEach((task) => {
        task.parentElement.classList.toggle("Completed"); // Mark as completed
        completedTasksList.appendChild(task.parentElement);
        task.checked = false;
    })

    toggleActionButtons();

    // Update the Completed Tasks List title
    updateCompletedTasksCount();
})

// Update Completed Tasks count
function updateCompletedTasksCount() {
    const completedTasksCount = Array.from(completedTasksList.querySelectorAll("li"));
    var i = 0;
    completedTasksCount.forEach((task) => {
        i = i + 1;
    })
    completedTasksTitle.textContent = "Completed tasks (" + i + ")";
}

// Add a keypress event listener to the input field to allow adding tasks by pressing Enter
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});