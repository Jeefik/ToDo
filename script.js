const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");
const counter = document.querySelector("#counter");
const counterDone = document.querySelector("#counterDone");
const clearAll = document.querySelector("#clearAll");
const sound = new Audio("sound/meme.mp3");

let tasks = [];

loadTasks();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks !== null) {
    tasks = JSON.parse(savedTasks);
  }

  render();
}

btn.addEventListener("click", function () {
  if (input.value.trim() === "") {
    input.classList.add("error");
    return;
  }
  for (let i = 0; i < tasks.length; i++) {
    if (
      tasks[i].text.trim().toLowerCase() === input.value.trim().toLowerCase()
    ) {
      const isConfirmThree = confirm(
        "Такая задача уже существует, добавить ещё раз?",
      );
      if (!isConfirmThree) {
        return;
      }
      break;
    }
  }
  if (input.value.trim().toLowerCase() === "пинч лох") {
    sound.play();
  }
  tasks.push({
    text: input.value,
    done: false,
  });
  saveTasks();
  render();

  input.value = "";
});

input.addEventListener("input", function () {
  input.classList.remove("error");
});

function render() {
  list.innerHTML = "";
  counter.textContent = tasks.length;

  let completedTasks = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      completedTasks++;
    }
  }
  counterDone.textContent = completedTasks;

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    if (tasks[i].done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.textContent = i + 1 + ". " + tasks[i].text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редактировать";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    li.addEventListener("click", function () {
      tasks[i].done = !tasks[i].done;
      saveTasks();
      render();
    });

    editBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      let userInput = prompt("Введите новые данные:");

      if (userInput !== null && userInput.trim() !== "") {
        tasks[i].text = userInput;
        saveTasks();
        render();
      }
    });

    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isConfirm = confirm("Вы точно хотите удалить задачу?");
      if (isConfirm) {
        tasks.splice(i, 1);
        saveTasks();
        render();
      }
    });

    list.appendChild(li);
  }
}
clearAll.addEventListener("click", function () {
  const isConfirmtwo = confirm("Вы точно хотите удалить все задачи?");
  if (isConfirmtwo) {
    tasks = [];
    saveTasks();
    render();
    input.focus();
  }
});

// Добавление по Enter
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btn.click();
  }
});
