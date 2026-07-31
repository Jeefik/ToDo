const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");
const counter = document.querySelector("#counter");
const counterDone = document.querySelector("#counterDone");
const clearAll = document.querySelector("#clearAll");
const sound = new Audio("sound/meme.mp3");
const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const completedBtn = document.querySelector("#completedBtn");
const ACTIVE_FILTER_CLASS = "active-filter";
const searchInput = document.querySelector("#searchInput");

let tasks = [];
let currentFilter = "all";
let currentSearch = "";

loadTasks();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks !== null) {
    tasks = JSON.parse(savedTasks);
  }
  updateFilterButtons();
  render();
}

setInterval(render, 60000);

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
    createdAt: Date.now(),
  });
  saveTasks();
  render();

  input.value = "";
});

input.addEventListener("input", function () {
  input.classList.remove("error");
});

function formatDate(createdAt) {
  if (!createdAt) return "—"; // Защита от undefined

  const date = new Date(createdAt);
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTimeAgo(createdAt) {
  const timeDifference = Date.now() - createdAt;

  const minutes = Math.floor(timeDifference / 60000);

  const hours = Math.floor(minutes / 60);

  const lastOneMinutes = minutes % 10;
  const lastTwoMinutes = minutes % 100;

  const lastOneHours = hours % 10;
  const lastTwoHours = hours % 100;

  if (hours >= 24) {
      return formatDate(createdAt);
    }
  if (hours >= 1) {

    if (lastTwoHours >= 11 && lastTwoHours <= 14) {
      return hours + " часов назад";
    }

    if (lastOneHours === 1) {
      return hours + " час назад";
    }
    if (lastOneHours >= 2 && lastOneHours <= 4) {
      return hours + " часа назад";
    }
    return hours + " часов назад";
  }

  if (minutes < 1) {
    return "Только что";
  }
  if (lastTwoMinutes >= 11 && lastTwoMinutes <= 14) {
    return minutes + " минут назад";
  }
  if (lastOneMinutes === 1) {
    return minutes + " минуту назад";
  }
  if (lastOneMinutes >= 2 && lastOneMinutes <= 4) {
    return minutes + " минуты назад";
  }

  return minutes + " минут назад";
}

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
  let shownTasks = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (currentFilter === "active" && tasks[i].done === true) {
      continue;
    }
    if (currentFilter === "completed" && tasks[i].done === false) {
      continue;
    }

    if (
      currentSearch.trim() !== "" &&
      !tasks[i].text.toLowerCase().includes(currentSearch.toLowerCase())
    ) {
      continue;
    }
    const li = document.createElement("li");
    if (tasks[i].done) {
      li.classList.add("done");
    }
    const contentDiv = document.createElement("div");
    contentDiv.className = "task-content";

    const span = document.createElement("span");
    span.textContent = i + 1 + ". " + tasks[i].text;

    const dateSpan = document.createElement("span");
    dateSpan.className = "task-date";
    dateSpan.textContent = formatTimeAgo(tasks[i].createdAt);
    contentDiv.appendChild(span);
    contentDiv.appendChild(dateSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редактировать";
    li.appendChild(span);
    li.appendChild(contentDiv);
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
    shownTasks++;
  }

  if (tasks.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "Список пуст";
    list.appendChild(emptyLi);
  } else if (shownTasks === 0) {
    const noneLi = document.createElement("li");
    noneLi.textContent = "🔍 Ничего не найдено";
    list.appendChild(noneLi);
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

allBtn.addEventListener("click", function () {
  currentFilter = "all";
  updateFilterButtons();
  render();
});

activeBtn.addEventListener("click", function () {
  currentFilter = "active";
  updateFilterButtons();
  render();
});

completedBtn.addEventListener("click", function () {
  currentFilter = "completed";
  updateFilterButtons();
  render();
});

function updateFilterButtons() {
  allBtn.classList.remove(ACTIVE_FILTER_CLASS);
  activeBtn.classList.remove(ACTIVE_FILTER_CLASS);
  completedBtn.classList.remove(ACTIVE_FILTER_CLASS);

  if (currentFilter === "all") {
    allBtn.classList.add(ACTIVE_FILTER_CLASS);
  }
  if (currentFilter === "active") {
    activeBtn.classList.add(ACTIVE_FILTER_CLASS);
  }
  if (currentFilter === "completed") {
    completedBtn.classList.add(ACTIVE_FILTER_CLASS);
  }
}

searchInput.addEventListener("input", function () {
  currentSearch = searchInput.value;
  render();
});

// Добавление по Enter
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btn.click();
  }
});
