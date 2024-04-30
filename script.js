let addButton = document.getElementById("button");
let incompleteList = document.getElementById("todo-list-incomplete");
let completeList = document.getElementById("todo-list-complete");
let itemIdCounter = 0;
let draggingItem = null;

addButton.addEventListener("click", function add() {
  let taskNameInput = document.getElementById("taskNameInput");
  let descriptionInput = document.getElementById("descriptionInput");

  if (
    taskNameInput.value.trim() === "" ||
    descriptionInput.value.trim() === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill out both the task name and description fields.",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-content",
        confirmButton: "custom-swal-confirm-button",
      },
    });
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

function handleDragStart(event) {
  draggingItem = event.target;
}

function handleDragEnd() {
  draggingItem = null;
}

function handleDragOver(event) {
  event.preventDefault();
}

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

document
  .getElementById("todo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("taskNameInput").focus();
    add();
  });

document.getElementById("toggleSwitch").addEventListener("change", function () {
  if (this.checked) {
    incompleteList.style.display = "none";
    completeList.style.display = "block";
  } else {
    incompleteList.style.display = "block";
    completeList.style.display = "none";
  }
});

document.addEventListener("dragstart", handleDragStart);
document.addEventListener("dragend", handleDragEnd);
document.addEventListener("dragover", handleDragOver);
document.addEventListener("drop", handleDrop);
