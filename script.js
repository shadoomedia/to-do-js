let addButton = document.getElementById("button");
let incompleteList = document.getElementById("todo-list-incomplete");
let completeList = document.getElementById("todo-list-complete");
let itemIdCounter = 0;
let draggingItem = null;

// Function to handle the 'add' button click event
addButton.addEventListener("click", function add() {
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
  listItem.draggable = true;
  listItem.id = "item-" + itemIdCounter++;

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
    let undoButton = document.createElement("button");
    undoButton.className = "btn undo-btn";
    undoButton.textContent = "Undo";
    listItem.appendChild(undoButton);

    undoButton.addEventListener("click", function () {
      incompleteList.appendChild(listItem);
      listItem.removeChild(undoButton);
      listItem.removeChild(deleteButton);
      listItem.appendChild(completeButton);
      listItem.appendChild(deleteButton);
    });
  });

  deleteButton.addEventListener("click", function () {
    listItem.remove();
  });

  incompleteList.appendChild(listItem);

  document.getElementById("todo-form").reset();
});

// Function to handle the start of a drag operation
function handleDragStart(event) {
  draggingItem = event.target;
}

// Function to handle the end of a drag operation
function handleDragEnd() {
  draggingItem = null;
}

// Function to handle the movement of an item during a drag operation
function handleDragOver(event) {
  event.preventDefault();
}

// Function to handle dropping an item into a new position
function handleDrop(event) {
  if (draggingItem) {
    const target = event.target.closest("li");
    if (
      (draggingItem.closest("#todo-list-complete") &&
        event.target.closest("#todo-list-incomplete")) ||
      (draggingItem.closest("#todo-list-incomplete") &&
        event.target.closest("#todo-list-complete"))
    ) {
      event.preventDefault();
      return;
    }

    if (target) {
      event.preventDefault();
      const rect = target.getBoundingClientRect();
      const nextItem =
        event.clientY > rect.top + rect.height / 2
          ? target.nextSibling
          : target;

      if (nextItem) {
        target.parentNode.insertBefore(draggingItem, nextItem);
      } else {
        target.parentNode.appendChild(draggingItem);
      }
    }

    draggingItem = null;
  }
}

// Add event listeners for mouse events
document.addEventListener("dragstart", handleDragStart);
document.addEventListener("dragend", handleDragEnd);
document.addEventListener("dragover", handleDragOver);
document.addEventListener("drop", handleDrop);

// Add event listeners for touch events
document.addEventListener("touchstart", function (event) {
  handleDragStart(event.touches[0]);
});
document.addEventListener("touchend", handleDragEnd);
document.addEventListener("touchmove", function (event) {
  handleDrop(event.touches[0]);
});
