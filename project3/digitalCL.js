const clock = document.querySelector("#clock");



//setTimeout(() => {
  //code it will be executed after 1000 milliesecond = 1 sec
//}, 1000)

setInterval(() => {
    let date = new Date();
    clock.innerHTML =  date.toLocaleTimeString();
}, 1000);