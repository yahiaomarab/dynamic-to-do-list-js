document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  loadTasks();

  function addTask(taskText, save = true) {
    if (!taskText || taskText.trim() === "") {
      alert("Please enter a valid task");
      return;
    }

    item = document.createElement("li");
    item.textContent = taskText;

    removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      taskList.removeChild(item);

      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = storedTasks.filter((task) => task !== taskText);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    });

    item.appendChild(removeBtn);

    taskList.appendChild(item);

    taskInput.value = "";

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' to avoid saving again
  }
  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
