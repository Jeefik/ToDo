const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");

let tasks = [];
loadTasks();

function savedTasks {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks != null) {
        tasks = JSON.parse(savedTasks)
    }
    render()
}

btn.addEventListener("click", function(){
 if (input.value ==="") return;
 if (input.value.trim().toLowerCase() === "пинч лох"){
    sound.play();
 }
 tasks.push({
    text: input.value,
    done: false,
    })
    savedTasks();
    render();

    input.value = "";

 });

 function render(){
    list.innerHTML = "";

 }