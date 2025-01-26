document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from Local Storage when the page is loaded
    loadTasks();
  
    // Function to add a new task
    function addTask(taskText, save = true) {
      if (!taskText || taskText.trim() === "") {
        alert("Please enter a valid task");
        return;
      }
  
      // Trim the task text
      taskText = taskText.trim();
  
      // Create a new list item
      const item = document.createElement("li");
      item.textContent = taskText;
  
      // Add a class to the list item
      item.classList.add("task-item");
  
      // Create the remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
  
      // Add click event to remove button
      removeBtn.addEventListener("click", () => {
        taskList.removeChild(item); // Remove the list item
  
        // Update Local Storage
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = storedTasks.filter((task) => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      });
  
      // Append the remove button to the list item
      item.appendChild(removeBtn);
  
      // Append the list item to the task list
      taskList.appendChild(item);
  
      // Save to Local Storage if the save flag is true
      if (save) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      }
    }
  
    // Function to load tasks from Local Storage
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' to avoid saving again
    }
  
    // Add event listener to "Add Task" button
    addButton.addEventListener("click", () => {
      addTask(taskInput.value);
      taskInput.value = ""; // Clear the input field
    });
  
    // Add event listener to input field for "Enter" key
    taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addTask(taskInput.value);
        taskInput.value = ""; // Clear the input field
      }
    });
  });
  