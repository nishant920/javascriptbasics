const clock = document.querySelector("#clock");



//setTimeout(() => {
  //code it will be executed after 1000 milliesecond = 1 sec
//}, 1000)

//let date = new Date();
//console.log(date.toLocaleDateString());
//console.log(date.toLocaleTimeString());
//console.dir(date);

setInterval(() => {
    let date = new Date();
    clock.innerHTML =  date.toLocaleDateString() + " " + date.toLocaleTimeString();
}, 1000);
