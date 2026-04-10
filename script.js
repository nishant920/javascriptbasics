
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
let task = {
    title: "study",
    completed: false,
    userAction: function(){
        return "User has picked up the task" + " : " + task.title;
    }
};
task.topic = "DSA"
console.log(task.title);
delete task.topic;
console.log(task);
task.status = "hold";
for(let key in task){
  console.log(key, task[key]);
}

console.log("FUNCTION");

console.log(task.userAction())