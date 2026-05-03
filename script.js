
let tasks = [];

function addTask() {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if (value === "") return;

    tasks.push({
        title: value,
        completed: false
    });

    input.value = "";
    renderTask();
}

function renderTask() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task.title;

        const btn = document.createElement("button");
        btn.innerText = "Delete";

        btn.addEventListener("click", function(event) {
            event.stopPropagation();
            tasks.splice(index, 1);
            renderTask();
        });

        btn.addEventListener("click", function(event) {
            console.log("Deleted : ", task.title);
        })
        //since btn is also inside li, when you click the button, you are also clicking inside the li
        //That movement from child element to parent element is called event bubbling. we use e.stopPropagation() to not inherit the li on click to btn 
        li.onclick = function(){
            tasks[index].completed = !tasks[index].completed;
            renderTask();
        };
        if (task.completed) {
            li.style.textDecoration = "line-through";
        }
        li.appendChild(btn);
        list.appendChild(li);
    });
}












//ADD
//let a = 9;
//let b = 19;
//function add(a, b){
//    return a + b;
//}
//
//console.log(add(a, b));


//ODD-EVEN
//function checkEvenOdd(num){
//    if(num%2===0){
//        return "even";
//    }else{
//        return "Odd";
//    }
//}
//
//console.log(checkEvenOdd(9));

//REVERSE STRING
//function reverseString(str){
//    return str.split("").reverse().join("");
//}
//console.log(reverseString("helloo     sus"))

//Objects
//  let task = {
//      title: "study",
//      completed: false,
//      userAction: function(){
//          return "User has picked up the task" + " : " + task.topic;
//      }
//  };
//  task.topic = "DSA"
//  console.log(task.title);
// 
//  console.log(task);
//  task.status = "hold";
//  for(let key in task){
//    console.log(key, task[key]);
//  }
//
//  console.log("FUNCTION");
//
//  console.log(task.userAction())
//
//this keyword for arrow function and normal funtion behaves diffrently 
// while for normal funtion it mainly points to object that owns the methode but for 
// but arrow don't have their own this they inherit it from surrending and lexical scope(window object)
/*
arr = ["a", "b", "c"]

function removeAtIndex(arr, index){
  arr.splice(index, 2);
  return arr;
}

console.log(removeAtIndex(arr, 0));

//It is important to know that splice() is a mutating method. This means it physically changes the original array in your computer's memory

/*
let task ={
    title: "Study",
    completed: false
};
//toggle
task.completed = !task.completed;
console.log(task.completed);


let task =[
    {title: "Study", completed: false}, {title: "gym", completed: true}
];

function toggleTask(index) {
    task[index].completed = !task[index].completed;
    return task[index];
}
console.log(task);
console.log(toggleTask(0));


let tasks = [];

function addTasks(task){
tasks.push(task);
}

addTasks("Study");

console.log(tasks);
*/