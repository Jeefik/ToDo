const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");
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
  if (input.value === "") return;
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

function render() {
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    if (tasks[i].done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.textContent = i + 1 + ". " + tasks[i].text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    li.addEventListener("click", function () {
      li.classList.toggle("done");
      tasks[i].done = !tasks[i].done;
      saveTasks();
    });

    deleteBtn.addEventListener("click", function () {
      tasks.splice(i, 1);
      saveTasks();
      render();
    });

    list.appendChild(li);
  }
}

// Добавление по Enter
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btn.click();
  }
});
