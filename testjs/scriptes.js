const btn = document.querySelector("#btn");
const input = document.querySelector("#input");
const list = document.querySelector("#list");

btn.addEventListener("click", function () {
  if (input.value === "GansLox") {
    const li = document.createElement("li");
    li.textContent = input.value;

    li.addEventListener("dblclick", function () {
      li.classList.toggle("ganslox");
      console.log(li);
    });
    list.appendChild(li);
  }
  input.value = "";
});

const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");

const tasks = [];

btn.addEventListener("click", function () {
  if (input.value === "") return;
  tasks.push(input.value);
  list.innerHTML = "";
  console.log(tasks);

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.textContent = tasks[i];

    li.addEventListener("click", function () {
      li.classList.toggle("done");
    });
    li.addEventListener("dblclick", function () {
      li.remove();
    });

    list.appendChild(li);
  }
  input.value = "";
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btn.click();
  }
});

const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");

const tasks = [];

btn.addEventListener("click", function () {
  if (input.value === "") return;
  tasks.push(input.value);
  list.innerHTML = "";
  console.log(tasks);
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.textContent = tasks[i];
    li.addEventListener("click", function () {
      li.classList.toggle("done");
    });
    li.addEventListener("dblclick", function () {
      li.remove();
    });
    list.appendChild(li);
  }
  input.value = "";
});
