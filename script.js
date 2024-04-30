let addButton = document.getElementById("button");
let incompleteList = document.getElementById("todo-list-incomplete");
let completeList = document.getElementById("todo-list-complete");
let itemIdCounter = 0;
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

let draggingItem = null;

document.addEventListener("dragstart", function (event) {
  draggingItem = event.target;
});

document.addEventListener("touchstart", function (event) {
  draggingItem = event.target;
});

document.addEventListener("dragover", function (event) {
  event.preventDefault();
});

document.addEventListener("touchmove", function (event) {
  event.preventDefault();
});

document.addEventListener("drop", function (event) {
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
});

document.addEventListener("touchend", function (event) {
  draggingItem = null;
});
