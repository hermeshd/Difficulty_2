//Select elements from the HTML document
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

//Function to add a new task
function addTask() {
    // Get the task text from the input field
    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new list item
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Append the new task to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";

        // Add a click event listener to mark tasks as completed
        listItem.addEventListener("click", () => {
            listItem.classList.toggle("completed");
            console.log("Ay hpta");
        });
    }
}

// Add a click event listener to the "Add" button
addButton.addEventListener("click", addTask);

// Add a keypress event listener to the input field to allow adding tasks by pressing Enter
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});