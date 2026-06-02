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

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task.title;
        

        const btn = document.createElement("button");
        btn.innerText = "Delete";
        btn.addEventListener("click", function(event){
            event.stopPropagation();
            tasks.splice(index, 1);
            renderTask();
        })

        const btn2 =document.createElement("button");
        btn2.innerText = "Completed";
        btn2.addEventListener("click", function(event){
            li.style.textDecoration = "lign-through";
            renderTask();
        })

        list.appendChild(li);
        li.appendChild(btn);
        li.appendChild(btn2);
    });

}