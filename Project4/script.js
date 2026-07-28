 /* const taskInput = document.getElementById("taskInput");
 const addBtn = document.getElementById("addbtn");
 const taskList = document.getElementById("taskList");

 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

 // Simulates fetching tasks from a server after a short delay.
 function fakeFetchTasks() {
    return new Promise((resolve, reject) => {
      const success = true;
      
      setTimeout(() => {
        if(success){
        resolve([
          { id: 1, input: "Learn async await", completed: false },
          { id: 2, input: "Practice interview questions", completed: false }
        ]);} else{
          reject("Failed to load tasks");
        }
      }, 2000);
    });
  }

 // Loads tasks asynchronously and renders them on the page.
 async function loadTask(){
        if(tasks.length > 0){
          renderTasks();
          return;
        }

        taskList.innerHTML = "<li>Loading tasks...</li>";
        try{
        const fetchedTasks = await fakeFetchTasks();
        
        tasks = fetchedTasks;
        saveTasks();
        renderTasks();
        console.log(tasks); 
        } catch(error){
          taskList.innerHTML = `<li>${error}</li>`;
          console.log("Error: ", error);
        } finally{
          console.log("loading finished");
        }
    } 
loadTask();    

 // Runs addTask when the Add button is clicked.
 addBtn.addEventListener("click", addTask);

 // Simulates creating a new task on a server.
 function fakeAddTask(text){
  return new Promise((resolve, reject) =>{
    const success = true;
    
    setTimeout(() => {
      if(success){
      resolve({
        id: Date.now(),
        input: text,
        completed: false
      });} else{
        reject("Adding Task failed")
      } 
    }, 2000);
  })
 }

 // Adds a new task after waiting for the fake async server response.
 async function addTask(){
    const text = taskInput.value.trim();
    if(text===""){
        return;
    }
  addBtn.disabled = true;
  addBtn.innerText = "Adding.."
  try{
  const newTask = await fakeAddTask(text); 
    
    tasks.push(newTask);
    saveTasks();
    taskInput.value ="";
    renderTasks();
    console.log(tasks);
  }catch(error){
    console.log(error)
  }finally{
    addBtn.disabled = false;
    addBtn.innerText = "Add";
  }
 }

 function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks))
 }

 // Clears the list and displays all tasks from the tasks array.
 function renderTasks(){
    const list = document.querySelector("#taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Toggles the completed status when a task item is clicked.
        li.addEventListener("click", function(){
            task.completed=!task.completed;
            saveTasks();
            renderTasks();
        })

        li.innerHTML=task.input;

        if(task.completed){
            li.classList.add("completed")
        }
        

        const btn = document.createElement("button");
        btn.innerHTML = "Delete";

        // Deletes the selected task and stops the li click event from running.
        btn.addEventListener("click", function(event){
            event.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            console.log("Deleted : ", task.input);

            renderTasks();
        })

        li.append(btn);
        list.append(li);
    });
 }
*/

