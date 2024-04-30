let addButton = document.getElementById("button");
let incompleteList = document.getElementById("todo-list-incomplete");
let completeList = document.getElementById("todo-list-complete");

addButton.addEventListener("click", function () {
  let taskNameInput = document.getElementById("taskNameInput");
  let descriptionInput = document.getElementById("descriptionInput");

  if (
    taskNameInput.value.trim() === "" ||
    descriptionInput.value.trim() === ""
  ) {
    alert("Please fill out both task name and description.");
    return;
  }

  let listItem = document.createElement("li");
  listItem.innerHTML =
    '<span class="listTaskName">' +
    taskNameInput.value +
    "</span>" +
    '<span class="listTaskDescription">' +
    descriptionInput.value +
    "</span>" +
    '<button class="btn complete-btn">Complete</button>' +
    '<button class="btn delete-btn">Delete</button>';

  let completeButton = listItem.getElementsByClassName("complete-btn")[0];
  let deleteButton = listItem.getElementsByClassName("delete-btn")[0];

  completeButton.addEventListener("click", function () {
    completeList.appendChild(listItem);
    listItem.removeChild(completeButton);
  });

  deleteButton.addEventListener("click", function () {
    listItem.remove();
  });

  incompleteList.appendChild(listItem);

  document.getElementById("todo-form").reset();
});
