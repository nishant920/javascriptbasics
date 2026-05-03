const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
    e.preventDefault();
  //  console.log(e);

    const height = Number(document.querySelector("#height").value);
    const weight = Number(document.querySelector("#weight").value);
    const result = document.querySelector("#result");
    if(height<60 || isNaN(height)){
        result.innerHTML = `please enter valid height ${height}`;
    }
    else if(weight <= 10 || isNaN(weight)){
        result.innerHTML = `please enter a valid weight ${weight}`;
    }

    else {
        const bmi = (weight/((height*height)/10000)) 
        console.log(bmi);
        result.innerHTML=`<span> <b>${bmi}</b> </span>`
    }
})

