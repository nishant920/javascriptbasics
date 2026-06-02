//callback hell
/*
function getData(dataId, getNextData){
    setTimeout(() => {
        console.log("data", dataId);
        if(getNextData){
            getNextData();
        }
    }, 4000);
}
getData(1, () =>{
    console.log("getting data 2...");

    getData(2, () => {
        console.log("getting data 3...");

        getData(3, ()=>{
            console.log("getting data 4...");

            getData(4)
        })
    });
})
*/
//dificult to understand and manage due to nesting function

//Promises

/* let promise = new Promise((resolve, reject) =>{
  let sucsess = false;

  if(sucsess){
    resolve("Task completed")
  }
  else reject("Task failed")
});

promise.then((res) => {
    console.log('success message :>> ', res);
    return "2nd Task completed"
}).then((res2) => {
    console.log("success message :>>", res2);
    return "3rd Task completed"
}).then((res3) => {
    console.log("sucess message :>>", res3);
}).catch((e)=>{
    console.error("error: " + e );
}).finally(() => {
    console.log("Task is Important")
})

async function getData(){
    try{
        const result = await promise;
        console.log("success message :>>", result);
        const result2 = "2nd task completed";
        console.log("success message :>>", result2)
    }
    catch(e){
        console.log('error:>> ', e);
    }
}
*/
/*
function checkInventory(callback){
    setTimeout(() => {
        console.log('checking inventory :>> ');
        callback();
    }, 2000);
}

function createOrder(callback){
    setTimeout(() => {
        console.log('creating an order :>> ');
        const error = new Error("Order creation failed. ");

        callback(error);
        
    }, 3000);
}

function payment(callback){
    setTimeout(() => {
        console.log('charging the payment :>> ');
        const error = null;
        let ChargedPayment = 100;
        callback(error, ChargedPayment);
    }, 1000);
}

function sendInvoice(){
    setTimeout(() => {
        console.log('sending Invoice:>> ');
        console.log("Request is completed ....");
        
    }, 1000);
}

//callback hell
function main(){
    checkInventory(() =>{
        createOrder((error) =>{
            if(error){
                console.log(error);
            }
            payment((e, amount) =>{
                if(e){
                    console.log(e)
                    return;
                }
                console.log("charged :", amount);
                sendInvoice();
            });
        });
    }); 
//    payment();
//    sendInvoice();

 //   console.log("Request is completed ....");
}

main();


//clouser example 
function outerFunction(){
    let name = "nishant";

    function innerFunction(){
        console.log(name);
    }

    return innerFunction;
}

let fun = outerFunction();

fun();

function fn(){
    let a = 2;
    let b = 3;
    let c = 3;
    console.log(a+b+c); 
}
var once = function(fn){
    let called = false;
    return function(args){
        if(called) return undefined;

        called = true;
        return fn(args);
    }
}
*/

const promise = new Promise((resolve, reject) => {
    const sucess = true;
    setTimeout(() => {
        if(sucess){
            resolve("Data recived");
        }else {
            reject("data failed")
        }
    }, 1000);
})

promise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
}).finally(()=>{
    console.log("Done")
})

//diff between arrow and normal functio
const tasks = {
    task: "study",

    Normalfunction: function() {
        console.log(this.task);
    },
    arraowFunction: () => {
        console.log(this.task);
    }
}

const promise1 = new Promise((resolve, reject) => {
    let sucess = true;
    setTimeout(() => {
        if(sucess){
            resolve("Data Recived");
        }else{
            reject("Data rejected");
        }
    }, 2000);
});

promise.then((result) => {
    console.log(result);
}).catch((error) =>{
    console.log(error);
}).finally(()=>{
    console.log("Done");
})

async function showData(){
    try {
        const result = await promise
        console.log(result)
    }catch(error){
        console.log(error);
    }finally{
        console.log("done")
    }
}