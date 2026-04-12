
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

//arr = ["a", "b", "c"]
//
//function removeAtIndex(arr, index){
//  arr.splice(index, 1);
//  return arr;
//}
//
//console.log(removeAtIndex(arr, 1));
//
//It is important to know that splice() is a mutating method. This means it physically changes the original array in your computer's memory

