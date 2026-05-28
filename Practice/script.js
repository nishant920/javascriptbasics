let tasks = [];

const addBtn = document.getElementById("btn-add");
addBtn.addEventListener("click", addTask);
function addTask(){
    const inputTask = document.getElementById("task")
    const value = inputTask.value.trim();

    if(value === "") return;

    tasks.push({
        title: value,
        completed: false
    });
    inputTask.value ="";
    renderTask();
}

function renderTask() {
    const list = document.getElementById("taskList")
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = task.title;
        list.appendChild(li);

        const btn = document.createElement("button");
        btn.innerText = "Delete";


    });
}